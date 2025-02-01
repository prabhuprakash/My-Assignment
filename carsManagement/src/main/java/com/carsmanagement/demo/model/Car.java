package com.carsmanagement.demo.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cars")
public class Car {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int carId;
	private String brand;
	private String model;
	private int year;
	private float price;
	
	@ManyToOne
	@JoinColumn(name="ownerId")
	private Owner owner;

	@ManyToOne(optional = false)
	@JoinColumn(name="dealershipId" , nullable = false)
	private Dealership dealership;

	@ManyToMany()
	@JoinTable(
		name = "carFeature",
		joinColumns = @JoinColumn(name="carId"),
		inverseJoinColumns = @JoinColumn(name="featureId")
	)
	private List<Feature> features = new ArrayList<>();
}
