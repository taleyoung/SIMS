package com.example.student.Dao.View;

import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "stu_gro")
public class StuGro {

    @Id
    @Column(name = "sgname")
    private String sgname;
    @Column(name = "scount")
    private String scount;

    public StuGro() {
    }

    @Override
    public String toString() {
        return "StuGro{" +
                "sgname='" + sgname + '\'' +
                ", scount='" + scount + '\'' +
                '}';
    }

    public String getSgname() {
        return sgname;
    }

    public void setSgname(String sgname) {
        this.sgname = sgname;
    }

    public String getScount() {
        return scount;
    }

    public void setScount(String scount) {
        this.scount = scount;
    }

}
