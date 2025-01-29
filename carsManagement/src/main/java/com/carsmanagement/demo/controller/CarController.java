package com.carsmanagement.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.service.CarService;

@RestController
@RequestMapping("/cars")
public class CarController {
	
	@Autowired
	CarService carService;
	
	@GetMapping("/all")
	public List<CarDTO> getAllCars(){
		return carService.getAllCars();
	}
	
	@PostMapping("/addcar") 
	public ResponseEntity<String> addCar(@RequestBody CarDTO carDTO) {
		    return carService.addCar(carDTO);
	}
}
