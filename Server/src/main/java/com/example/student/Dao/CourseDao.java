package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseDao extends JpaRepository<Course,Integer> {
    Course findByCno(Integer cno);
    Course findByTname(String tname);
    /**
     * 显示出该页所有的课程
     * */
    @Override
    Page<Course> findAll(Pageable pageable);
}
