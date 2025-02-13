package com.coursemanagement.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.coursemanagement.repositories.CourseRepository;

@Service
public class PublicService {
  
  @Autowired
  private CourseRepository courseRepository;
  
  public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
    if (courseRepository.count() != 0) {
        List<Map<String, Object>> courseList = courseRepository.findAll().stream()
            .map(course -> {
                Map<String, Object> courseMap = new HashMap<>();
                courseMap.put("courseId", course.getCourseId());
                courseMap.put("courseName", course.getCourseName());
                courseMap.put("courseInstructor", course.getCourseInstructor());
                courseMap.put("courseDescription", course.getCourseDescription());
                courseMap.put("courseTechnologies", course.getCourseTechnologies());
                return courseMap;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(courseList);
    } else {
        return ResponseEntity.noContent().build();
    }
  }
}
