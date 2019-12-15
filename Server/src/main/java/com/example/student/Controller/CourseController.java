package com.example.student.Controller;

import com.example.student.Dao.Course;
import com.example.student.Dao.CourseDao;
import com.example.student.Dao.ScDao;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private ScDao scDao;

    @Autowired
    private CourseDao courseDao;

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

}
