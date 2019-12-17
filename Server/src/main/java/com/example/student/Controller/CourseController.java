package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.StuId;
import com.example.student.Request.TeacherUpdateGrade;
import com.example.student.VO.AllCourseInfo;
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

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private ScDao scDao;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;
    /**
     * 显示当前的所有课程
     * 返回加上状态和tname
     * */
    @RequestMapping(value = "/",method = RequestMethod.POST)
    public Result allCourse(@RequestBody StuId stuId,//学生id
                            @RequestParam int pageNum,
                            @RequestParam int pageSize){
//        Pageable pageable = PageRequest.of(pageNum, pageSize);
//        Page<Course> pages = courseDao.findAll(pageable);
//        if(pages == null){
//            return new Result(ResultCode.ERROR);
//        }
        List<Course> courses = courseDao.findAll();
        Student student = studentDao.findById(stuId.getId()).orElse(null);
        List<AllCourseInfo> list = new ArrayList<>();
        for(int i = pageNum*pageSize; i < Math.min((pageNum+1)*pageSize,courses.size());i++){
            AllCourseInfo allCourseInfo = new AllCourseInfo();
            allCourseInfo.setCname(courses.get(i).getCname());
            allCourseInfo.setCno(courses.get(i).getCno());
            allCourseInfo.setTid(courses.get(i).getTid());
            Teacher teacher = teacherDao.findById(courses.get(i).getTid()).orElse(null);
            allCourseInfo.setTname(teacher.getName());
            /***/
            Sc scc = scDao.findByCnoAndAccount(courses.get(i).getCno(), student.getAccount());
            if(scc != null){
                allCourseInfo.setStatus(1);//表示已选
            }else {
                allCourseInfo.setStatus(0);//表示未选
            }
            list.add(allCourseInfo);
            System.out.println(allCourseInfo);
        }
        ListInfo listInfo = new ListInfo(courses.size(),
                pageNum,
                list);
        return new Result(ResultCode.SUCCESS,listInfo);
    }


    /**
     * 修改学生分数
     * 课程号cno
     * 学生id
     * 学生分数
     * */
    @RequestMapping(value = "/grades/{cno}",method = RequestMethod.PUT)
    public Result updateGrade(
            @PathVariable String cno,
            @RequestBody TeacherUpdateGrade[] updateGrades){
        if(updateGrades == null){
            return new Result(ResultCode.WARN);
        }
        //Course course = courseDao.findByCno(Integer.parseInt(cno));
        for(int i = 0; i < updateGrades.length; i++){
            Student student = studentDao.findById(updateGrades[i].getId()).orElse(null);
            Sc sc = scDao.findByCnoAndAccount(Integer.parseInt(cno),student.getAccount());
            sc.setGrade(updateGrades[i].getGrade());
            scDao.save(sc);
        }
        return new Result(ResultCode.SUCCESS);
    }

}
