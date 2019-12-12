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
    private String sname;
    private Integer cno;
    private String cname;
    private double grade;
    private String sdept;
    private String tname;

    @Override
    public String toString() {
        return "Sc{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", name='" + sname + '\'' +
                ", cno=" + cno +
                ", cname='" + cname + '\'' +
                ", grade=" + grade +
                ", sdept='" + sdept + '\'' +
                ", teacher='" + tname + '\'' +
                '}';
    }

    public Sc() {
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
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

    public String getSname() {
        return sname;
    }

    public void setSname(String name) {
        this.sname = name;
    }

    public Integer getCno() {
        return cno;
    }

    public void setCno(Integer cno) {
        this.cno = cno;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getSdept() {
        return sdept;
    }

    public void setSdept(String sdept) {
        this.sdept = sdept;
    }
}
