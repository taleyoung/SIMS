package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.*;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.VO.StuCourseInfo;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private ScDao scDao;

    @Autowired
    private SgDao sgDao;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private StudentGroupDao studentGroupDao;

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
        Optional<Student> optional = studentDao.findById(Integer.parseInt(id));
        if(optional.isPresent()){
            Student student = optional.get();
            student.setPassword(newPassword);
            //System.out.println(student);
            studentDao.save(student);
            return new Result(ResultCode.SUCCESS,student);
        }
        return new Result(ResultCode.WARN);
    }

    /**
     * 学生选课查询，查询已选课程
     * @request：account
     * */
    @RequestMapping(value = "/{id}/course",method = RequestMethod.GET)
    public Result myCourses(@PathVariable String id,
                            @RequestParam int pageNum,
                            @RequestParam int pageSize){
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        String account = student.getAccount();
        //List<Sc> scs = scDao.findAllByAccount(account);
//        Pageable pageable = PageRequest.of(pageNum, pageSize);
//        Page<Sc> pages = scDao.findAllByAccount(account,pageable);
        List<Sc> list = scDao.findAllByAccount(account);
        List<StuCourseInfo> liststucourse = new ArrayList<>();
        for(int i = pageNum*pageSize; i < Math.min((pageNum+1)*pageSize,list.size());i++){
            StuCourseInfo stuCourseInfo = new StuCourseInfo();
            stuCourseInfo.setId(student.getId());
            stuCourseInfo.setAccount(student.getAccount());
            stuCourseInfo.setSname(student.getName());
            stuCourseInfo.setCno(list.get(i).getCno());
            stuCourseInfo.setCname(courseDao.findByCno(list.get(i).getCno()).getCname());
            stuCourseInfo.setGrade(list.get(i).getGrade());
            liststucourse.add(stuCourseInfo);
        }
        if(list.size() == 0){
            Result result = new Result(ResultCode.ERROR);
            result.setMessage("选课信息为空");
            return result;
        }
        ListInfo ll = new ListInfo(list.size(), pageNum,
                                   liststucourse);
//        if(pages.isEmpty()){
//            return new Result(ResultCode.ERROR);
//        }
//        ListInfo listInfo = new ListInfo(pages.getTotalElements(), pageNum, pages.getContent());
        return new Result(ResultCode.SUCCESS,ll);
    }

    /**
     * 学生选课，新增选课记录
     * @request：id  学生id
     * @request：cno
     * 由于手动添加了几条数据，所以自增出现了问题！！！！
     * 删除手动添加的数据即可
     * */
    @RequestMapping(value = "{id}/course",method = RequestMethod.POST)
    public Result addCourse(@PathVariable String id,
                            @RequestBody StuCourse stuCourse){
        int cno = stuCourse.getCno();
        //Course course = courseDao.findByCno(cno);
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        /**判断这门课是否已经选过了*/
        Sc scc = scDao.findByCnoAndAccount(cno, student.getAccount());
        if(scc != null){
            //System.out.println(scc);
            Result result = new Result(ResultCode.WARN);
            result.setMessage("该门课已经选过了");
            return result;
        }
        Sc sc = new Sc();
        sc.setAccount(student.getAccount());
        sc.setCno(cno);
        scDao.save(sc);
        return new Result(ResultCode.SUCCESS);
    }

    /**
     * 学生退选课程
     * @request id  学生id
     * @request cno 课程号
     * */
    @RequestMapping(value = "{id}/course",method = RequestMethod.DELETE)
    public Result deleteCourse(
            @PathVariable String id,
            @RequestBody StuCourse stuCourse){
        int cno = stuCourse.getCno();
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        if(student == null){
            return new Result(ResultCode.WARN);
        }
        Sc sc = scDao.findByCnoAndAccount(cno,student.getAccount());
        if(sc == null) return new Result(ResultCode.ERROR);
        scDao.delete(sc);
        return new Result(ResultCode.SUCCESS);
    }

    /**
     * 学生参加学会
     * */
    @RequestMapping(value = "{id}/group",method = RequestMethod.POST)
    public Result addGroup(
            @PathVariable String id,
            @RequestBody StuGroup stuGroup){
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        /**
         * 判断是否已经参加了这个学会
         * */
        Sg ssg = sgDao.findBySidAndGid(Integer.parseInt(id),stuGroup.getGid());
        if(ssg != null){
            Result result = new Result(ResultCode.WARN);
            result.setMessage("该学会已经选过了");
            return result;
        }
        Sg sg = new Sg();
        sg.setGid(stuGroup.getGid());
        sg.setSid(Integer.parseInt(id));
        sgDao.save(sg);
        return new Result(ResultCode.SUCCESS);
    }

    /**
     * 学生查看自己参加的学会
     * */
    @RequestMapping(value = "{id}/group",method = RequestMethod.GET)
    public Result showGroup(@PathVariable String id,
                            @RequestParam int pageNum,
                            @RequestParam int pageSize){
//        Pageable pageable = PageRequest.of(pageNum, pageSize);
//        Page<Sg> pages = sgDao.findAll(pageable);
        List<StudentGroup> groups = new ArrayList<>();
        List<Sg> sgs = sgDao.findAllBySid(Integer.parseInt(id));
        if(sgs.size() == 0){
            Result result = new Result(ResultCode.WARN);
            result.setMessage("暂无相关信息");
            return result;
        }
        for(int i = pageNum*pageSize;i<Math.min((pageNum+1)*pageSize, sgs.size());i++){
            StudentGroup studentGroup = studentGroupDao.findById(sgs.get(i).getGid()).orElse(null);
            groups.add(studentGroup);
        }
        ListInfo listInfo = new ListInfo(
                groups.size(),
                pageNum,
                groups);
        return new Result(ResultCode.SUCCESS,listInfo);
    }
}
