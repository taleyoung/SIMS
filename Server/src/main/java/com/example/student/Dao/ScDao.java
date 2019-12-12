package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ScDao extends JpaRepository<Sc,Integer> {
    //List<Sc> findAllByCnoAndTname(Integer cno, String tname);
    Page<Sc> findAllByCnoAndTname(Integer cno, String tname,Pageable pageable);
    Page<Sc> findAllByAccount(String account,Pageable pageable);
    //List<Sc> findAllByAccount(String sname);
    Sc findByCnoAndAccount(int cno,String account);
}
