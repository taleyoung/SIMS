package com.example.student.Dao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class StudentGroup {

    @Id
    @GeneratedValue
    private int id;

    private String sgname;
    private int sgno;
    private Date setdate;
    private String place;

    public StudentGroup() {
    }

    @Override
    public String toString() {
        return "StudentGroup{" +
                "id=" + id +
                ", sgname='" + sgname + '\'' +
                ", sgno=" + sgno +
                ", setdate=" + setdate +
                ", place='" + place + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSgname() {
        return sgname;
    }

    public void setSgname(String sgname) {
        this.sgname = sgname;
    }

    public int getSgno() {
        return sgno;
    }

    public void setSgno(int sgno) {
        this.sgno = sgno;
    }

    public Date getSetdate() {
        return setdate;
    }

    public void setSetdate(Date setdate) {
        this.setdate = setdate;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
}
