package com.carsmanagement.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Dealership;



@Repository
public interface DealershipRepository extends JpaRepository<Dealership, Integer>{
	boolean existsByPhone(String phone);

	boolean existsByName(String name);

	Optional<Dealership>  findByName(String name);
}

