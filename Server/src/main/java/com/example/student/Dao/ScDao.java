package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ScDao extends JpaRepository<Sc,Integer> {
    Page<Sc> findAllByAccount(String account, Pageable pageable);
}
