package com.example.student.Request;

public class TeacherUpdateGrade {

    private int id;//学生id
    private double grade;//分数

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }
}
