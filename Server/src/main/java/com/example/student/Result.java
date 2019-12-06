package com.example.student;

import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 返回类
 * */
public class Result implements Serializable {

    @SuppressWarnings("unused")
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Result.class);

    private static final long serialVersionUID = -1802122468331526708L;
    private int code = -1;
    private String message = "待处理";
    private Map<String, Object> data = new HashMap<String, Object>();

    public Result(){}

    public Result(int status, String message){
        this.code = status;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setStatus(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void putData(String key, Object value) {
        data.put(key, value);
    }

    public void removeData(String key) {
        data.remove(key);
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