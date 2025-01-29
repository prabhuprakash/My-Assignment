package com.carsmanagement.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.dto.DealershipDTO;
import com.carsmanagement.demo.mapper.DealershipMapper;
import com.carsmanagement.demo.model.Dealership;
import com.carsmanagement.demo.repository.DealershipRepository;

@Service
public class DealershipService {
	
	@Autowired
	DealershipRepository dealershipRepo;
	public List<DealershipDTO> getAllDealership(){
		List<Dealership> dealerships = dealershipRepo.findAll();			
		return dealerships.stream()
						  .map(DealershipMapper.dealershipMapper::toDealershipDTO)
						  .collect(Collectors.toList());
	}
	
	public ResponseEntity<String> createDealership(DealershipDTO dealershipDTO) {
		if (dealershipRepo.existsByPhone(dealershipDTO.getPhone())) {
            return ResponseEntity.badRequest().body("Phone number is already registered");
        }
		dealershipRepo.save(DealershipMapper.dealershipMapper.toDealership(dealershipDTO));
		return ResponseEntity.ok("dealership created Successfully");
	}
}
