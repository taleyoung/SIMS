package com.example.student.Dao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 学生选课实体
 * */
@Entity
public class Sc {

    @Id
    @GeneratedValue
    private Integer id;
    private String account;
    private Integer cno;
    private double grade;


    @Override
    public String toString() {
        return "Sc{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", cno=" + cno +
                ", grade=" + grade +
                '}';
    }

    public Sc() {
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }


    public Integer getCno() {
        return cno;
    }

    public void setCno(Integer cno) {
        this.cno = cno;
    }

}
