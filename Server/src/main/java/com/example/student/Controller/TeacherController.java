package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.Information;
import com.example.student.Request.TeacherCno;
import com.example.student.Request.TeacherUpdateGrade;
import com.example.student.VO.Result;
import com.example.student.VO.Stulistdatainfo;
import com.example.student.VO.TeaStulistInfo;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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
     * @Request cno
     * @Request tname
     * @Request pageNum
     */
    @RequestMapping(value = "/{id}/stulist",method = RequestMethod.GET)
    public Result findChooseAll(
            @PathVariable String id,
            @RequestParam int pageNum,
            @RequestParam int pageSize,
            @RequestBody TeacherCno teacherCno){
        int cno = teacherCno.getCno();
        Teacher teacher = teacherDao.findById(Integer.parseInt(id)).orElse(null);
        String tname = teacher.getName();
        //List<Sc> scList = scDao.findAllByCnoAndTname(cno, tname);
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Sc> pages = scDao.findAllByCnoAndTname(cno, tname,pageable);
        if(pages.isEmpty()){
            return new Result(ResultCode.WARN);
        }
        TeaStulistInfo teaStulistInfo = new TeaStulistInfo(pages.getTotalElements(),
                                                           pageNum,
                                                           pages.getContent());
        System.out.println(teaStulistInfo);
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
     * 修改学生分数
     * */
    @RequestMapping(value = "/{id}/grades",method = RequestMethod.PUT)
    public Result updateGrade(
            @PathVariable String id,
            @RequestBody TeacherUpdateGrade[] updateGrades){
        if(updateGrades == null){
            return new Result(ResultCode.WARN);
        }
        for(int i = 0; i < updateGrades.length; i++){
            Student student = studentDao.findById(updateGrades[i].getId()).orElse(null);
            Teacher teacher = teacherDao.findById(Integer.parseInt(id)).orElse(null);
            Course course = courseDao.findByTname(teacher.getName());
            Sc sc = scDao.findByCnoAndAccount(course.getCno(),student.getAccount());
            sc.setGrade(updateGrades[i].getGrade());
            scDao.save(sc);
        }
        return new Result(ResultCode.SUCCESS);
    }
}
