package com.carsmanagement.demo.dto;

import java.util.List;

import com.carsmanagement.demo.model.Dealership;
import com.carsmanagement.demo.model.Feature;
import com.carsmanagement.demo.model.Owner;

import lombok.Data;

@Data
public class CarDTO {
	private String brand;
	private String model;
	private int year;
	private float price;
	private Owner owner;
	private Dealership dealership;
	private List<Feature> features;
}
