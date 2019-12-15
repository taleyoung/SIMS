package com.example.student.Controller;

import com.example.student.Dao.*;
import com.example.student.Request.TeacherUpdateGrade;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    /**
     * 显示当前的所有课程
     * */
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public Result allCourse(@RequestParam int pageNum,
                            @RequestParam int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Course> pages = courseDao.findAll(pageable);
        if(pages == null){
            return new Result(ResultCode.ERROR);
        }
        ListInfo listInfo = new ListInfo(pages.getTotalElements(),
                pageNum,
                pages.getContent());
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
