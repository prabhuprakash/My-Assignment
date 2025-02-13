package com.coursemanagement.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileDTO {
  
  private String userName;

  @Email(message = "Invalid email format")
  private String emailId;

  @Size(min = 8, message = "Password must be at least 8 characters")
  @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", 
               message = "Password must have at least one uppercase letter and one special character")
  private String password;
}
