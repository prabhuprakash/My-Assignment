package com.carsmanagement.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class CarDTO {
	private String brand;
	private String model;
	private int year;
	private float price;
	private OwnerDTO owner;
	private DealershipDTO dealership;
	private List<FeatureDTO> features;
}
