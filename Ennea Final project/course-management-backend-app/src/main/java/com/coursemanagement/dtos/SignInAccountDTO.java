package com.coursemanagement.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignInAccountDTO {
  @NotBlank(message = "userName cannot be empty")
  private String userName;
  @NotBlank(message = "Password cannot be empty")
  private String password;
}
