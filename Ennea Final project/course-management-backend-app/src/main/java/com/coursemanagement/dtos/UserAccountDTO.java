package com.coursemanagement.dtos;

import jakarta.validation.constraints.Pattern;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class UserAccountDTO {
  @NotBlank(message = "userName cannot be empty")
  private String userName;
  @NotBlank(message = "emailId cannot be empty")
  private String emailId;
  @NotBlank(message = "Password cannot be empty")
  @Size(min = 8, message = "Password must be at least 8 characters long")
  @Pattern(
    regexp = "^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message = "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long"
  )
  private String password;
}
