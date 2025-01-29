package com.carsmanagement.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsmanagement.demo.dto.DealershipDTO;
import com.carsmanagement.demo.service.DealershipService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/dealerships")
public class DealershipController {
	
	@Autowired
	DealershipService dealershipService;
	
	@GetMapping("/all")
	public List<DealershipDTO> getAllDealership(){
		return dealershipService.getAllDealership();
	}
	
	@PostMapping("createdealership")
	public ResponseEntity<String> createDealership(@RequestBody DealershipDTO dealershipDTO) {
		
		return dealershipService.createDealership(dealershipDTO);
	}
	
}
