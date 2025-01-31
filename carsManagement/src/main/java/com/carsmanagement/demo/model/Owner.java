package com.carsmanagement.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "owners")
public class Owner {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private	int ownerId;
	private String firstName;
	private String lastName;
	@Column(unique = true)
	private String phoneNumber;
	private String address;
	
	@JsonIgnore
	@OneToMany(mappedBy="owner", cascade= CascadeType.ALL )
	private List<Car> cars;
}
