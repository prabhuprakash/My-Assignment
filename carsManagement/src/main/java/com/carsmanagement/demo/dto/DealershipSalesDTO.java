package com.carsmanagement.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DealershipSalesDTO {
  private String dealershipName;
  private Long carsSold;
}
