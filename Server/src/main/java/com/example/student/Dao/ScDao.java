package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ScDao extends JpaRepository<Sc,Integer> {
    List<Sc> findAllByCno(Integer cno);
    //Page<Sc> findAllByAccount(String account,Pageable pageable);
    List<Sc> findAllByAccount(String account);
    Sc findByCnoAndAccount(int cno,String account);
}
