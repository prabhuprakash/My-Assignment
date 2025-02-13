package com.coursemanagement.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coursemanagement.dtos.CourseDTO;
import com.coursemanagement.dtos.UpdateProfileDTO;
import com.coursemanagement.services.AdminService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/admin")
public class AdminController {
  
  private final AdminService adminService;
  
  public AdminController(AdminService adminService){
    this.adminService = adminService;
  }
  @PostMapping("/addcourse")
  public ResponseEntity<String> addCourse(@RequestBody CourseDTO courseDTO) {
        // Call the service to handle the business logic
        return adminService.addCourse(courseDTO);
    }

  @DeleteMapping("/deletecourse/{courseId}")
  public ResponseEntity<String> deleteCourse(@PathVariable Long courseId) {
    return adminService.deleteCourse(courseId);
  }

  @PutMapping("/editcourse/{courseId}")
  public ResponseEntity<String> editCourse(@PathVariable Long courseId, @RequestBody CourseDTO courseDTO) {
      return adminService.editCourse(courseId,courseDTO);
  }

  @GetMapping("/courses")
  public ResponseEntity<List<CourseDTO>> getAllCourses() {
      return adminService.getAllCourses();
  }
  

  @GetMapping("/check-role")
  public ResponseEntity<Map<String, String>> checkRole() {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      Map<String, String> response = new HashMap<>();
      response.put("username", auth.getName());
      response.put("authorities", auth.getAuthorities().toString());
      response.put("isAuthenticated", String.valueOf(auth.isAuthenticated()));
      return ResponseEntity.ok(response);
  }

  @GetMapping("/allusers")
  public ResponseEntity<List<Map<String, String>>> getAllUsersExceptAdmins() {
    return adminService.getAllUsers();
  }

  @DeleteMapping("/delete/{userName}")
  public ResponseEntity<String> deleteAccount(@PathVariable String userName){
    return adminService.deleteAccount(userName);
  }

  @PutMapping("/updateprofile")
    public ResponseEntity<String> updateProfile(@Valid @RequestBody UpdateProfileDTO updateProfileDTO) {
       return adminService.updateProfile(updateProfileDTO);
    }

}
