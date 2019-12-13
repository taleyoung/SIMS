package com.example.student.VO;

public class StuListInfo {
    private int id;
    private String account;
    private String sname;
    private int cno;
    private String cname;
    private double grade;
    private String sdept;
    private String tname;

    @Override
    public String toString() {
        return "StuListInfo{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", sname='" + sname + '\'' +
                ", cno=" + cno +
                ", cname='" + cname + '\'' +
                ", grade=" + grade +
                ", sdept='" + sdept + '\'' +
                ", tname='" + tname + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public void setSname(String sname) {
        this.sname = sname;
    }

    public int getCno() {
        return cno;
    }

    public void setCno(int cno) {
        this.cno = cno;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public String getSdept() {
        return sdept;
    }

    public void setSdept(String sdept) {
        this.sdept = sdept;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }
}
