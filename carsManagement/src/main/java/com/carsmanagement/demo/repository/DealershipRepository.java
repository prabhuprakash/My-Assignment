package com.carsmanagement.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Dealership;

@Repository
public interface DealershipRepository extends JpaRepository<Dealership, Integer>{
	boolean existsByPhone(String phone);
}
