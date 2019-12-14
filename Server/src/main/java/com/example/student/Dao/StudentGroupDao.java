package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentGroupDao extends JpaRepository<StudentGroup,Integer> {
    Page<StudentGroup> findAll(Pageable pageable);
}
