package com.coursemanagement.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coursemanagement.models.Technology;

@Repository
public interface TechnologyRepository extends JpaRepository<Technology,Long>{
    boolean existsByTechnologyName(String technologyName);
    Optional<Technology> findByTechnologyName(String technologyName);
}
