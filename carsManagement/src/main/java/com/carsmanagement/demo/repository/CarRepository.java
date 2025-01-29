package com.carsmanagement.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer>{

}
