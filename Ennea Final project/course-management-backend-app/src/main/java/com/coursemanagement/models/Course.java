package com.coursemanagement.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long courseId;
  
  private String courseName;
  
  private String courseDescription;

  private String courseInstructor;
  @JsonIgnore
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "course_technology",
    joinColumns = @JoinColumn(name = "course_id"),
    inverseJoinColumns = @JoinColumn(name = "technology_id")
  )
  private Set<Technology> courseTechnologies = new HashSet<>();
  
  @JsonIgnore
  @ManyToMany(mappedBy = "courses",fetch = FetchType.EAGER)
  private Set<UserAccount> users = new HashSet<>();
}
