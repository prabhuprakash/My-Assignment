package com.carsmanagement.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner,Integer>{
	 boolean existsByPhoneNumber(String phoneNumber);
}
