package com.carsmanagement.demo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.repository.QueryRepository;

@Service
public class QueryService {
	
	@Autowired
	QueryRepository queryRepository;
	
	public ResponseEntity<LinkedHashMap<String , Long>> getSalesRecords() {
		List<Object[]> salesRecords = queryRepository.getSalesRecords();
		
		if (salesRecords == null || salesRecords.isEmpty()) {
	        return ResponseEntity.noContent().build();  
	    }
		LinkedHashMap<String,Long> mapSalesRecords= salesRecords.stream()
        .collect(Collectors.toMap(
            record -> (String) record[0], 
            record -> (Long) record[1],
            (existing, replacement) -> existing,
            LinkedHashMap::new
        ));
		return ResponseEntity.ok(mapSalesRecords);
		
	}
	
	public ResponseEntity<List<Map<String, Object>>> getOwnedCars() {
	    List<Object[]> ownedCars = queryRepository.getOwnedCars();
	    Map<String, Map<String, List<String>>> ownerCarsMap = new LinkedHashMap<>();

	    for (Object[] record : ownedCars) {
	        String ownerName = (String) record[0];
	        String phoneNumber = (String) record[1];
	        String carDetails = (String) record[2]; 
	        // Use ownerName and phoneNumber as a composite key in the map
	        String key = ownerName + "_" + phoneNumber;

	        // Create the map for the specific owner and phone number
	        ownerCarsMap.computeIfAbsent(key, k -> new HashMap<>())
	                .computeIfAbsent("carsOwned", k -> new ArrayList<>())
	                .add(carDetails);
	    }

	    // Convert the map to a list of maps with the desired structure
	    List<Map<String, Object>> responseList = new ArrayList<>();
	    for (Map.Entry<String, Map<String, List<String>>> entry : ownerCarsMap.entrySet()) {
	        String[] keyParts = entry.getKey().split("_");
	        Map<String, Object> ownerMap = new LinkedHashMap<>();
	        ownerMap.put("ownerName", keyParts[0]);
	        ownerMap.put("phoneNumber", keyParts[1]);
	        ownerMap.put("carsOwned", entry.getValue().get("carsOwned"));
	        responseList.add(ownerMap);
	    }

	    return ResponseEntity.ok(responseList);
	}
}
