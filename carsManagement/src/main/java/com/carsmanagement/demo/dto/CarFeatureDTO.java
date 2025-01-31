package com.carsmanagement.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class CarFeatureDTO {
  private int carId;
  private List<Integer> featureIds;
}
