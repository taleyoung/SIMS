package com.example.student.senum;

public enum ResultCode {

    SUCCESS(0, "请求成功"),
    WARN(-1, "网络异常，请稍后重试"),
    ERROR(-2,"输入信息错误");

    private int code;
    private String message;

    ResultCode(int code, String msg) {
        this.message = msg;
    }

    public int getCode() {
        return code;
    }
    public String getMsg() {
        return message;
    }
}
