package com.example.student.Dao;


import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherDao extends JpaRepository<Teacher,Integer> {
      Teacher findByAccount(String account);
}
