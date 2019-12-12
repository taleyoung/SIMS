package com.example.student.VO;

public class TeaStulistInfo<T>{
    public long total;
    public int pageNum;
    public T data;//嵌套封装的类必须设置为公有

    public TeaStulistInfo(long total, int pageNum, T data) {
        this.total = total;
        this.pageNum = pageNum;
        this.data = data;
    }
}
