package com.carsmanagement.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.dto.CarFeatureDTO;
import com.carsmanagement.demo.mapper.CarMapper;
import com.carsmanagement.demo.model.Car;
import com.carsmanagement.demo.model.Dealership;
import com.carsmanagement.demo.model.Feature;
import com.carsmanagement.demo.model.Owner;
import com.carsmanagement.demo.repository.CarRepository;
import com.carsmanagement.demo.repository.DealershipRepository;
import com.carsmanagement.demo.repository.FeatureRepository;
import com.carsmanagement.demo.repository.OwnerRepository;

@Service
public class CarService {
	
	@Autowired
	CarRepository carRepository;
	
	@Autowired
	DealershipRepository dealershipRepository;
	
	@Autowired
	OwnerRepository ownerRepository;
	
	@Autowired
	FeatureRepository featureRepository;
	
	@Autowired
	CarMapper carMapper;
	
	public Page<CarDTO> getAllCars(Pageable pageable){
		if (pageable == null) {
			throw new IllegalArgumentException("Pageable must not be null");
		}
		Page<Car> cars = carRepository.findAll(pageable);
	
		return cars.map(carMapper::toCarDTO);
			   
	}
	
	public ResponseEntity<String> addCar(CarDTO carDTO) {
	   
	    if (carDTO.getDealership() == null || !dealershipRepository.existsByName(carDTO.getDealership().getName())) {
	        return ResponseEntity.badRequest().body("Dealership is mandatory for adding a car");
	    }
			
	    Car car = carMapper.toCar(carDTO);

	    Optional<Dealership> dealership = dealershipRepository.findByName(carDTO.getDealership().getName());
	   if(dealership.isPresent()) {
		   car.setDealership(dealership.get());
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
	
	public ResponseEntity<String> upgradeCar(CarFeatureDTO carFeatureDTO) {
		Optional<Car> optionalCar = carRepository.findById(carFeatureDTO.getCarId());
		if (!optionalCar.isPresent()) {
			return ResponseEntity.badRequest().body("Car not found with ID: " + carFeatureDTO.getCarId());
		}	
		Car car = optionalCar.get();		
		List<Feature> features = featureRepository.findAllById(carFeatureDTO.getFeatureIds());
		if (features.isEmpty()) {
			return ResponseEntity.badRequest().body("No valid features found");
		}
		car.getFeatures().addAll(features);
		carRepository.save(car);
			
			return ResponseEntity.ok("Car features updated successfully");

	}
}
