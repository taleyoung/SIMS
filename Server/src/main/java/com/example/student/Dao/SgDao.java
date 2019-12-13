package com.example.student.Dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SgDao extends JpaRepository<Sg,Integer> {
    @Override
    Page<Sg> findAll(Pageable pageable);

    List<Sg>  findAllBySid(int sid);

    Sg findBySidAndGid(int sid,int gid);
}
