package com.example.student.Controller;

import com.example.student.Dao.Student;
import com.example.student.Dao.StudentDao;
import com.example.student.Dao.Teacher;
import com.example.student.Dao.TeacherDao;
import com.example.student.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private StudentDao studentDao;
    private TeacherDao teacherDao;

    @RequestMapping(value = "/",method = RequestMethod.POST)
    public ResponseEntity<Result> login(@RequestParam("account") String account,
                                        @RequestParam("password") String password,
                                        @RequestParam("choice") Integer choice) {
        if (choice == 0) {
            Student student = studentDao.findByAccount(account);
            Result result = new Result(200, "ok");
            if (student == null) {
                result.setStatus(400);
                result.setMessage("不存在该学生的相关信息");
                return new ResponseEntity<Result>(result, HttpStatus.BAD_REQUEST);
            } else {
                if (!student.getPassword().equals(password)) {
                    result.setStatus(400);
                    result.setMessage("密码错误");
                    return new ResponseEntity<Result>(result, HttpStatus.BAD_REQUEST);
                }
            }
            result.putData("mesage", student);
            return ResponseEntity.ok(result);
        }else {
            Teacher teacher = teacherDao.findByAccount(account);
            Result result = new Result(200, "ok");
            if (teacher == null) {
                result.setStatus(400);
                result.setMessage("不存在该老师的相关信息");
                return new ResponseEntity<Result>(result, HttpStatus.BAD_REQUEST);
            } else {
                if (!teacher.getPassword().equals(password)) {
                    result.setStatus(400);
                    result.setMessage("密码错误");
                    return new ResponseEntity<Result>(result, HttpStatus.BAD_REQUEST);
                }
            }
            result.putData("mesage", teacher);
            return ResponseEntity.ok(result);
        }
    }
}
