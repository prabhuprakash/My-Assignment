package com.coursemanagement.models;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Technology {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long technologyId;
  
  private String technologyName;
  
  @JsonIgnore
  @ManyToMany(mappedBy = "courseTechnologies",fetch = FetchType.EAGER)
  private Set<Course> courses = new HashSet<>();
}
