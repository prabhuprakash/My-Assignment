package com.coursemanagement.dtos;

import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.Null;
import lombok.Data;

@Data
public class CourseDTO {
  @Null(message = "courseId must not be provided when creating a course")
  private Long courseId;
  private String courseName;
  private String courseDescription;
  private String courseInstructor;
  private Set<TechnologyDTO> courseTechnologies = new HashSet<>();
  @Null(message = "userAccounts must not be provided when creating course")
  private Set<UserAccountDTO> users;
}
