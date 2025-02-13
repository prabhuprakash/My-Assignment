package com.coursemanagement.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coursemanagement.dtos.UpdateProfileDTO;
import com.coursemanagement.models.Course;
import com.coursemanagement.models.UserAccount;
import com.coursemanagement.repositories.CourseRepository;
import com.coursemanagement.repositories.UserAccountRepository;

@Service
public class UserService {

  @Autowired
  private CourseRepository courseRepository;

  @Autowired
  private UserAccountRepository userAccountRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;
  
  public ResponseEntity<String> enrollCourse(Long courseIdToEnroll){
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();

    Optional<UserAccount> userOpt = userAccountRepository.findById(userName);
    Optional<Course> courseOpt = courseRepository.findById(courseIdToEnroll);

    if (userOpt.isEmpty()) {
      throw new UsernameNotFoundException("User not found");
    }

    if (courseOpt.isEmpty()) {
      return ResponseEntity.badRequest().body("Course not found");
    }

    UserAccount user = userOpt.get();
    Course course = courseOpt.get();
    if (user.getCourses().size() >= 3) {
      return ResponseEntity.badRequest().body("Enrollment limit reached (Max 3 courses)");
    }

    if (user.getCourses().contains(course)) {
      return ResponseEntity.badRequest().body("User is already enrolled in this course");
    }

    user.getCourses().add(course);
    userAccountRepository.save(user);

    return ResponseEntity.ok("Enrolled in course successfully");
  }

  public ResponseEntity<String> leaveCourse(Long courseIdToLeave) {
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();

    Optional<UserAccount> userOpt = userAccountRepository.findById(userName);
    Optional<Course> courseOpt = courseRepository.findById(courseIdToLeave);

    if (userOpt.isEmpty()) {
        throw new UsernameNotFoundException("User not found");
    }

    if (courseOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("Course not found");
    }

    UserAccount user = userOpt.get();
    Course course = courseOpt.get();

    if (!user.getCourses().contains(course)) {
        return ResponseEntity.badRequest().body("User is not enrolled in this course");
    }

    user.getCourses().remove(course);
    userAccountRepository.save(user);

    return ResponseEntity.ok("Left course successfully");
  }

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

  public ResponseEntity<List<Map<String, String>>> getEnrolledCourses(String userName) {
    UserAccount user = userAccountRepository.findById(userName)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    List<Map<String, String>> enrolledCourses = user.getCourses().stream()
        .map(course -> Map.of("id", String.valueOf(course.getCourseId()), "name", course.getCourseName()))
        .collect(Collectors.toList());

    return ResponseEntity.ok(enrolledCourses);
  }

  public ResponseEntity<String> deleteAccount(String userNameToDelete){
    UserAccount userAccount = userAccountRepository.findById(userNameToDelete)
        .orElseThrow(()->new UsernameNotFoundException("User not found"));
    Set<Course> courses = userAccount.getCourses();
    for(Course course : courses){
      course.getUsers().remove(userAccount);
    }
    courseRepository.saveAll(courses);
    userAccountRepository.delete(userAccount);
    return ResponseEntity.ok("Account deleted successfully");
  }

  public ResponseEntity<String> updateProfile(String username, UpdateProfileDTO request) {
    Optional<UserAccount> userOpt = userAccountRepository.findById(username);
    
    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }

    UserAccount user = userOpt.get();
    if (request.getEmailId() != null && !request.getEmailId().isBlank()) {
        user.setEmailId(request.getEmailId());
    }
    if (request.getPassword() != null && !request.getPassword().isBlank()) {
        user.setPassword(passwordEncoder.encode(request.getPassword()));
    }

    userAccountRepository.save(user);
    return ResponseEntity.ok("Profile updated successfully");
  }
}