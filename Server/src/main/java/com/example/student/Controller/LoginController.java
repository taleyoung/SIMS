package com.example.student.Controller;

import com.example.student.Dao.Student;
import com.example.student.Dao.StudentDao;
import com.example.student.Dao.Teacher;
import com.example.student.Dao.TeacherDao;
import com.example.student.Request.Login;
import com.example.student.VO.Result;
import com.example.student.senum.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private StudentDao studentDao;
    @Autowired
    private TeacherDao teacherDao;

    @RequestMapping(value = "/",method = RequestMethod.POST)
    public Result login(@RequestBody Login login) {
        String account = login.getAccount();
        String password = login.getPassword();
        Integer choice = login.getChoice();
        System.out.println("login"+login);
        if (choice == 0) {
            Student student = studentDao.findByAccount(account);
            System.out.println(student);
            if (student == null) {
                return new Result(ResultCode.WARN);
            } else {
                if (!student.getPassword().equals(password)) {
                    return new Result(ResultCode.ERROR);
                }
            }

            return new Result(ResultCode.SUCCESS,student);
        } else {
            Teacher teacher = teacherDao.findByAccount(account);
            if (teacher == null) {
                return new Result(ResultCode.WARN);
            } else {
                if (!teacher.getPassword().equals(password)) {
                    return new Result(ResultCode.ERROR);
                }
            }
            return new Result(ResultCode.SUCCESS,teacher);
        }
    }
}
