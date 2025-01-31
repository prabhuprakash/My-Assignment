package com.carsmanagement.demo.model;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "features")
public class Feature {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int featureId;
  private String featureName;

  @JsonIgnore
  @ManyToMany(mappedBy = "features")
  private List<Car> cars = new ArrayList<>();
}
