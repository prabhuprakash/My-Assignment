package com.carsmanagement.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Dealership;

@Repository
public interface QueryRepository extends JpaRepository<Dealership, Integer> {

	@Query(value = "SELECT d.name, COUNT(c.car_id) " +
	        "FROM dealerships d " +
	        "LEFT JOIN cars c ON d.dealership_id = c.dealership_id " +
	        "LEFT JOIN owners o ON c.owner_id = o.owner_id " +
	        "GROUP BY d.name " + "ORDER BY COUNT(c.car_id) DESC", 
	        nativeQuery = true)
	List<Object[]> getSalesRecords();
	
	@Query(value="Select CONCAT(owners.first_name, ' ', owners.last_name),owners.phone_number, CONCAT(cars.brand,' ',cars.model) from owners left join cars on owners.owner_id=cars.owner_id  group by owners.owner_id,brand,model", nativeQuery = true)
	List<Object[]>getOwnedCars();
}
