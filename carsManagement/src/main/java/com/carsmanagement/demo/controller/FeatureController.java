package com.carsmanagement.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsmanagement.demo.dto.FeatureDTO;
import com.carsmanagement.demo.service.FeatureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/features")
public class FeatureController {

  @Autowired
  FeatureService featureService;
  @GetMapping("/all")
  public Page<FeatureDTO> getAllCarFeatures(@PageableDefault(size = 20,sort = "featureId",direction = Sort.Direction.ASC ) Pageable pageable){
		return featureService.getAllCarFeatures(pageable);
	}
  @PostMapping("/addfeature")
  public ResponseEntity<String> addFeature(@RequestBody FeatureDTO featureDTO) {
	  return featureService.addFeature(featureDTO);
	}
  
  @DeleteMapping("/removefeature/{featureName}")
  public ResponseEntity<String> removeFeature(@PathVariable String featureName) {
    return featureService.removeFeature(featureName);
  }
  
}
