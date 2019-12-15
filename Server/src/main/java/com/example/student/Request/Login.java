package com.example.student.Request;

public class Login {
    private String account;
    private String password;
    private Integer choice;

    @Override
    public String toString() {
        return "Login{" +
                "account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", choice=" + choice +
                '}';
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getChoice() {
        return choice;
    }

    public void setChoice(Integer choice) {
        this.choice = choice;
    }
}
