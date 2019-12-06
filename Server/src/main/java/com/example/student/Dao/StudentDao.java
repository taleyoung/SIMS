package com.example.student.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDao extends JpaRepository<Student,Integer> {
    Student findByAccount(String account);
}
