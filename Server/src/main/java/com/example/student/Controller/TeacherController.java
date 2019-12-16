package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.Information;
import com.example.student.Request.TeacherCno;
import com.example.student.VO.*;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private ScDao scDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired CourseDao courseDao;

    /**
     * 查看选修自己这门课的所有学生
     * cno
     * pageNum
     * pageSize
     */
    @RequestMapping(value = "/{id}/stulist",method = RequestMethod.POST)
    public Result findChooseAll(
            @PathVariable String id,
            @RequestParam int pageNum,
            @RequestParam int pageSize,
            @RequestBody TeacherCno teacherCno){
        int cno = teacherCno.getCno();
        List<Sc> list = scDao.findAllByCno(cno);
        if(list.size()==0){
            Result result = new Result(ResultCode.ERROR);
            result.setMessage("暂无选课信息");
            return result;
        }
        List<StuListInfo> listInfos = new ArrayList<>();
        for(int i = pageNum*pageSize;i<Math.min((pageNum+1)*pageSize, list.size());i++){
            StuListInfo stuListInfo = new StuListInfo();
            Student student = studentDao.findByAccount(list.get(i).getAccount());
            Teacher teacher = teacherDao.findById(Integer.parseInt(id)).orElse(null);
            Course course = courseDao.findByCno(cno);

            stuListInfo.setId(student.getId());
            stuListInfo.setAccount(student.getAccount());
            stuListInfo.setSname(student.getName());
            stuListInfo.setCno(cno);
            stuListInfo.setCname(course.getCname());
            stuListInfo.setGrade(list.get(i).getGrade());
            stuListInfo.setSdept(student.getSdept());
            stuListInfo.setTname(teacher.getName());
            //System.out.println(stuListInfo);
            listInfos.add(stuListInfo);
        }
//        Pageable pageable = PageRequest.of(pageNum, pageSize);
//        Page<Sc> pages = scDao.findAllByCno(cno,pageable);
//        if(pages.isEmpty()){
//            return new Result(ResultCode.WARN);
//        }
        TeaStulistInfo teaStulistInfo = new TeaStulistInfo(list.size(),
                                                           pageNum,
                                                           listInfos);
        //System.out.println(teaStulistInfo);
        return new Result(ResultCode.SUCCESS,teaStulistInfo);
    }

    /**
     * 个人信息修改
     * @request：id
     * @request：newpassword
     * */
    @RequestMapping(value = "/{id}/information",method = RequestMethod.PUT)
    public Result updateInformation(
            @PathVariable String id,
            @RequestBody Information information){
        String newPassword = information.getPassword();
        if(newPassword == null){
            Result result =new Result(ResultCode.WARN);
            result.setMessage("新密码不能为空");
            return result;
        }
        Optional<Teacher> optional = teacherDao.findById(Integer.parseInt(id));
        if(optional.isPresent()){
            Teacher teacher = optional.get();
            teacher.setPassword(newPassword);
            teacherDao.save(teacher);
            return new Result(ResultCode.SUCCESS,teacher);
        }
        return new Result(ResultCode.WARN);
    }


    /**
     * 老师查看自己教了哪几门课
     * */
    @RequestMapping(value = "/{id}/courses",method = RequestMethod.GET)
    public Result myCourses(
            @PathVariable String id,
            @RequestParam int pageNum,
            @RequestParam int pageSize){
        List<Course> list = courseDao.findAllByTid(Integer.parseInt(id));
        if(list.size() == 0){
            Result result = new Result(ResultCode.WARN);
            result.setMessage("暂无课程信息");
        }
        ListInfo listInfo = new ListInfo(
                list.size(),
                pageNum,
                list.subList((pageNum*pageSize), Math.min(list.size(), (pageNum+1)*pageSize)));
        return new Result(ResultCode.SUCCESS,listInfo);
    }

}
