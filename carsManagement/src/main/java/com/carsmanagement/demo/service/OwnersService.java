package com.carsmanagement.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.dto.OwnerDTO;
import com.carsmanagement.demo.mapper.OwnerMapper;
import com.carsmanagement.demo.model.Owner;
import com.carsmanagement.demo.repository.OwnerRepository;

@Service
public class OwnersService {
	
	@Autowired
	OwnerRepository repo;
	
	@Autowired
	private OwnerMapper ownerMapper;
	
	public List<OwnerDTO> getAllOwners(){
		List<Owner> owners =repo.findAll(); 
		return owners.stream()
					 .map(ownerMapper::toOwnerDTO)
					 .collect(Collectors.toList());
	}
	
	public ResponseEntity<String> createOwner(OwnerDTO ownerDTO) {
		if (repo.existsByPhoneNumber(ownerDTO.getPhoneNumber())) {
            return ResponseEntity.badRequest().body("Phone number is already registered");
        }
		repo.save(ownerMapper.toOwner(ownerDTO));
		return ResponseEntity.ok("Owner created Successfully");
	}
}
