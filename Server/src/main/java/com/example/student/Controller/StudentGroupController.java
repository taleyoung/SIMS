package com.example.student.Controller;

import com.example.student.Dao.View.StuGro;
import com.example.student.Dao.View.StuGroDao;
import com.example.student.VO.ListInfo;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/group")
public class StudentGroupController {
    @Autowired
    private StuGroDao stuGroDao;


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
}
