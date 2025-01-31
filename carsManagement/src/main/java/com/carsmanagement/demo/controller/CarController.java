package com.carsmanagement.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.dto.CarFeatureDTO;
import com.carsmanagement.demo.service.CarService;

@RestController
@RequestMapping("/cars")
public class CarController {
	
	@Autowired
	CarService carService;
	
	@GetMapping("/all")
	public Page<CarDTO> getAllCars(@PageableDefault(size = 20,sort = "carId",direction = Sort.Direction.ASC ) Pageable pageable){
		return carService.getAllCars(pageable);
	}
	
	@PostMapping("/addcar") 
	public ResponseEntity<String> addCar(@RequestBody CarDTO carDTO) {
		    return carService.addCar(carDTO);
	}

	@PostMapping("/upgradecar")
	public ResponseEntity<String> upgradeCar(@RequestBody CarFeatureDTO carFeatureDTO ){
		return carService.upgradeCar(carFeatureDTO);
	}
}
