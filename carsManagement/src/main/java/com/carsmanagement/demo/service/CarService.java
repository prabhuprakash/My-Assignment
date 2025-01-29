package com.carsmanagement.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.mapper.CarMapper;
import com.carsmanagement.demo.model.Car;
import com.carsmanagement.demo.model.Dealership;
import com.carsmanagement.demo.model.Owner;
import com.carsmanagement.demo.repository.CarRepository;
import com.carsmanagement.demo.repository.DealershipRepository;
import com.carsmanagement.demo.repository.OwnerRepository;

@Service
public class CarService {
	
	@Autowired
	CarRepository carRepository;
	
	@Autowired
	DealershipRepository dealershipRepository;
	
	@Autowired
	OwnerRepository ownerRepository;
	
	public List<CarDTO> getAllCars(){
		List<Car> cars = carRepository.findAll();
		return cars.stream()
				   .map(CarMapper.carMapper::toCarDTO)
				   .collect(Collectors.toList());
	}
	
	public ResponseEntity<String> addCar(CarDTO carDTO) {
	    
	    if (carDTO.getDealership() == null || carDTO.getDealership().getDealershipId() == 0) {
	        return ResponseEntity.badRequest().body("Dealership is mandatory for adding a car");
	    }

	    Car car = CarMapper.carMapper.toCar(carDTO);
	    
	    Optional<Dealership> dealership = dealershipRepository.findById(car.getDealership().getDealershipId());
	   if(dealership.isPresent()) {
		   car.setDealership(dealership.get());
	    
		   //Optional<Owner> owner = Optional.of(car.getOwner());
	    
		   if (car.getOwner()!= null) {
			   if (car.getOwner().getOwnerId() == 0) {
				   ownerRepository.save(car.getOwner());
			   } 
			   else {
				   Optional<Owner> existingOwner = ownerRepository.findById(car.getOwner().getOwnerId());
				   if(existingOwner.isEmpty())
					   return ResponseEntity.badRequest().body("Owner not found.");
				   car.setOwner(existingOwner.get());
			   }
			   
		   }
		   // Save the car
		   car = carRepository.save(car);
		   return ResponseEntity.ok("Car added successfully");
	   }
	   else 
		   return ResponseEntity.badRequest().body("Dealership not found");
	}
}
