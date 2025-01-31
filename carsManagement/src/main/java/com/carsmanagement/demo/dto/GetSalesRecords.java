package com.carsmanagement.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetSalesRecords {
  private String dealershipName;
  private Long carsSold;
}
