package com.coursemanagement.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coursemanagement.dtos.UpdateProfileDTO;
import com.coursemanagement.services.UserService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService){
    this.userService = userService;
  }

  @PostMapping("/enrollcourse/{courseId}")
  public ResponseEntity<String> enrollCourse(@PathVariable Long courseId) {
      
    return userService.enrollCourse(courseId);
  
  }

  @PostMapping("/leavecourse/{courseId}")
  public ResponseEntity<String> leaveCourse(@PathVariable Long courseId ) {
      return userService.leaveCourse(courseId);
  }
  
  @GetMapping("/enrolledcourses")
  public ResponseEntity<List<Map<String, String>>> getEnrolledCourses() {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      return userService.getEnrolledCourses(auth.getName());
  }
  
  @GetMapping("/courses")
  public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
      return userService.getAllCourses();
  }
  
  @DeleteMapping("/deleteaccount")
  public ResponseEntity<String> deleteAccount(){
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return userService.deleteAccount(auth.getName());
  }

  @PutMapping("/updateprofile")
    public ResponseEntity<String> updateProfile(@Valid @RequestBody UpdateProfileDTO updateProfileDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userService.updateProfile(username, updateProfileDTO);
    }
}
