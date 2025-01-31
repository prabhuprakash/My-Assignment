package com.carsmanagement.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetOwnedCarsDTO {
  private String Ownername;
  private String phoneNumber;
  private String car;
}
