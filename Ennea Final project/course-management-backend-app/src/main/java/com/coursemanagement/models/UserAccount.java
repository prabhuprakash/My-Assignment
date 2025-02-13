package com.coursemanagement.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserAccount {
  @Id
  private String userName;
  @Column(unique = true)
  private String emailId;
  private String password;
  private String role;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
    name = "user_courses",
    joinColumns = @JoinColumn(name = "user_Name"),
    inverseJoinColumns = @JoinColumn(name = "course_id")
  )
  private Set<Course> courses = new HashSet<>();
}
