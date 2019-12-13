package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseDao extends JpaRepository<Course,Integer> {
    Course findByCno(Integer cno);
    List<Course> findAllByTid(int tid);
    /**
     * 显示出该页所有的课程
     * */
    @Override
    Page<Course> findAll(Pageable pageable);
}
