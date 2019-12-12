package com.example.student.VO;


import com.example.student.senum.ResultCode;

/**
 * 返回类
 * */
public class Result<T> {

    private int code;
    private String message;
    private T data;

    public Result(ResultCode resultCode){
        this.code = resultCode.getCode();
        this.message = resultCode.getMsg();
    }

    public Result(ResultCode resultCode,T data){
        this.code = resultCode.getCode();
        this.message = resultCode.getMsg();
        this.data = data;
    }


    public Result() {
    }



    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }

}