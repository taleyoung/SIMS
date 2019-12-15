package com.example.student.Controller;

import com.example.student.Dao.StudentGroup;
import com.example.student.Dao.StudentGroupDao;
import com.example.student.Dao.View.StuGro;
import com.example.student.Dao.View.StuGroDao;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * 显示所有的学会以及已经已经选过改学会的学生人数
 * */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/group")
public class StudentGroupController {
    @Autowired
    private StuGroDao stuGroDao;


    @Autowired
    private StudentGroupDao studentGroupDao;
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public Result find(@RequestParam int pageNum,
                       @RequestParam int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<StuGro> pages = stuGroDao.findAll(pageable);
        ListInfo listInfo = new ListInfo(pages.getTotalElements(),
                                         pageNum,
                                         pages.getContent());
        return new Result(ResultCode.SUCCESS,listInfo);
    }
    /**
     * 显示所有的学会详细信息
     * */
    @RequestMapping(value = "/all",method = RequestMethod.GET)
    public Result findAll(@RequestParam int pageNum,
                          @RequestParam int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<StudentGroup> pages = studentGroupDao.findAll(pageable);
        ListInfo listInfo = new ListInfo(pages.getTotalElements(),
                pageNum,
                pages.getContent());
        return new Result(ResultCode.SUCCESS,listInfo);
    }
}
