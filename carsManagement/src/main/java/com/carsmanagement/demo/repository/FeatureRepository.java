package com.carsmanagement.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carsmanagement.demo.model.Feature;


@Repository
public interface FeatureRepository extends JpaRepository<Feature,Integer>{
  boolean existsByFeatureName(String featureName);

  Feature findByFeatureName(String featureName);
}
