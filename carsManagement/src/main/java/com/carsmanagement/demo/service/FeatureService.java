package com.carsmanagement.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.carsmanagement.demo.dto.FeatureDTO;
import com.carsmanagement.demo.mapper.FeatureMapper;
import com.carsmanagement.demo.model.Car;
import com.carsmanagement.demo.model.Feature;
import com.carsmanagement.demo.repository.CarRepository;
import com.carsmanagement.demo.repository.FeatureRepository;

@Service
public class FeatureService {
   
  @Autowired
  FeatureRepository featureRepository;

  @Autowired
  CarRepository carRepository;

  public Page<FeatureDTO> getAllCars(Pageable pageable){
		Page<Feature> features = featureRepository.findAll(pageable);
	
		return features.map(FeatureMapper.featureMapper::toFeatureDTO);
			   
	}

  public ResponseEntity<String> addFeature(FeatureDTO featureDTO) {
    if (featureRepository.existsByFeatureName(featureDTO.getFeatureName())){
      return ResponseEntity.badRequest().body("Feature already exists");
    }
		featureRepository.save(FeatureMapper.featureMapper.toFeature(featureDTO));
		return ResponseEntity.ok("Feature added successfully");
  }

  public ResponseEntity<String> removeFeature(FeatureDTO featureDTO){
    if(!featureRepository.existsByFeatureName(featureDTO.getFeatureName())){
      return ResponseEntity.ok("Feature doesn't exist");
    }
    else{
      Feature feature=featureRepository.findByFeatureName(featureDTO.getFeatureName());
      for(Car car : feature.getCars()){
        car.getFeatures().remove(feature);
        carRepository.save(car);
      }
      featureRepository.delete(feature);
      return ResponseEntity.ok("Feature deleted Successfully");
    }
  }
}