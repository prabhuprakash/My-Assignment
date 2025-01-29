package com.carsmanagement.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsmanagement.demo.dto.OwnerDTO;
import com.carsmanagement.demo.service.OwnersService;

@RestController
@RequestMapping("/owners")
public class OwnersController {
	
	@Autowired
	OwnersService ownersService;
	
	@GetMapping("/all")
	public List<OwnerDTO> getAllOwners(){
		return ownersService.getAllOwners();
	}
	
	@PostMapping("/createowner")
	public ResponseEntity<String> createOwner(@RequestBody OwnerDTO ownerDTO) {
		return ownersService.createOwner(ownerDTO);
	}; 
}
