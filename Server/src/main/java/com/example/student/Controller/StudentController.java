package com.example.student.Controller;

import com.example.student.Dao.Student;
import com.example.student.Dao.StudentDao;
import com.example.student.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentDao studentDao;

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public ResponseEntity<Result> findById(@PathVariable("id") Integer id) {
        Result result = new Result(200,"ok");
        Student student = studentDao.findById(id).orElse(null);
        if(student != null){
            result.putData("words", student);
            return ResponseEntity.ok(result);
        }else {
            result.setStatus(400);
            result.setMessage("Bad request");
            return new ResponseEntity<Result>(result, HttpStatus.BAD_REQUEST);
        }
    }

}
