package com.carsmanagement.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarInformationDTO {
  private String car;
  private String dealership;
  private String owner;
  private String ownerPhoneNumber;
}
