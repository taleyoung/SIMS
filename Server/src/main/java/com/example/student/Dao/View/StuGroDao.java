package com.example.student.Dao.View;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

public interface StuGroDao extends JpaRepository<StuGro,String> {

    Page<StuGro> findAllBy(Pageable pageable);
}
