package com.coursemanagement.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coursemanagement.services.PublicService;

@RestController 
@RequestMapping("/public")
public class PublicController {
  
  private final PublicService publicService;

  public PublicController(PublicService publicService){
    this.publicService = publicService;
  }
  
  @GetMapping("/courses")
  public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
      return publicService.getAllCourses();
  }
}
