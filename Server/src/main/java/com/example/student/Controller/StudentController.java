package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.*;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/student")

public class StudentController {

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private ScDao scDao;

    @Autowired
    private CourseDao courseDao;

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
            studentDao.save(student);
            return new Result(ResultCode.SUCCESS,student);
        }
        return new Result(ResultCode.WARN);
    }

    /**
     * 学生选课查询
     * @request：account
     * */
    @RequestMapping(value = "/{id}/course",method = RequestMethod.GET)
    public Result myCourses(@PathVariable String id,
                            @RequestParam int pageNum,
                            @RequestParam int pageSize){
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        String account = student.getAccount();
        //List<Sc> scs = scDao.findAllByAccount(account);
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Sc> pages = scDao.findAllByAccount(account,pageable);
        if(pages.isEmpty()){
            return new Result(ResultCode.ERROR);
        }
        ListInfo listInfo = new ListInfo(pages.getTotalElements(), pageNum, pages.getContent());
        return new Result(ResultCode.SUCCESS,listInfo);
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
        Course course = courseDao.findByCno(cno);
        Student student = studentDao.findById(Integer.parseInt(id)).orElse(null);
        /**判断这门课是否已经选过了*/
        Sc scc = scDao.findByCnoAndAccount(cno, student.getAccount());
        if(scc != null){
            //System.out.println(scc);
            Result result = new Result(ResultCode.WARN);
            result.setMessage("该门课已经选过了");
            return result;
        }
        String cname = courseDao.findByCno(cno).getCname();
        String tname = course.getTname();
        if(cname == null || student == null)
            return new Result(ResultCode.WARN);
        Sc sc = new Sc();
        sc.setAccount(student.getAccount());
        sc.setCname(cname);
        sc.setCno(cno);
        sc.setSname(student.getName());
        sc.setTname(tname);
        sc.setSdept(student.getSdept());
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
        scDao.delete(sc);
        return new Result(ResultCode.SUCCESS);
    }
}
