package com.carsmanagement.demo.controller;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


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
}
