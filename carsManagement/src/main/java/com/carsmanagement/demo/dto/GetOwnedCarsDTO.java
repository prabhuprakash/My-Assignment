package com.carsmanagement.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetOwnedCarsDTO {
  private String ownerName;
  private String phoneNumber;
  private String car;
}
