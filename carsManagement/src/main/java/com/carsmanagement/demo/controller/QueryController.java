package com.carsmanagement.demo.controller;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import com.carsmanagement.demo.dto.CarInformationDTO;
import com.carsmanagement.demo.service.QueryService;

@RestController
public class QueryController {
	
	@Autowired
	QueryService queryService;
	@GetMapping("/salesrecords")
	public ResponseEntity<LinkedHashMap<String,Long>> getSalesRecords() {
		return queryService.getSalesRecords();
	}
	@GetMapping("/ownedcars")
	public ResponseEntity<List<Map<String, Object>>> getOwnedCars(){
		return queryService.getOwnedCars();
	}
	@GetMapping("/getcarsinformation")
	public Page<CarInformationDTO> getCarsInformation(@PageableDefault(size = 20) Pageable pageable ){
		return queryService.getCarsInformation(pageable);
	}
}
