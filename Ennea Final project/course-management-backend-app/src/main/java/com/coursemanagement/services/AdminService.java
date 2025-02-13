package com.coursemanagement.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coursemanagement.dtos.CourseDTO;
import com.coursemanagement.dtos.TechnologyDTO;
import com.coursemanagement.dtos.UpdateProfileDTO;
import com.coursemanagement.mappers.CourseMapper;
import com.coursemanagement.models.Course;
import com.coursemanagement.models.Technology;
import com.coursemanagement.models.UserAccount;
import com.coursemanagement.repositories.CourseRepository;
import com.coursemanagement.repositories.TechnologyRepository;
import com.coursemanagement.repositories.UserAccountRepository;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TechnologyRepository technologyRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<String> addCourse(CourseDTO courseDTO) {
        try {
            // Find courses with the same name and instructor
            List<Course> existingCourses = courseRepository.findByCourseNameAndInstructor(
                courseDTO.getCourseName(), 
                courseDTO.getCourseInstructor()
            );
    
            Set<Technology> technologies = new HashSet<>();
            Set<String> newTechNames = new HashSet<>();
    
            // Process the technologies from the DTO
            for (TechnologyDTO techDTO : courseDTO.getCourseTechnologies()) {
                Optional<Technology> techOpt = technologyRepository.findByTechnologyName(techDTO.getTechnologyName());
                Technology tech = techOpt.orElseGet(() -> {
                    Technology newTech = new Technology();
                    newTech.setTechnologyName(techDTO.getTechnologyName());
                    return technologyRepository.save(newTech);
                });
                technologies.add(tech);
                newTechNames.add(tech.getTechnologyName());
            }
    
            // If no existing course, create a new one
            if (existingCourses.isEmpty()) {
                Course newCourse = new Course();
                newCourse.setCourseName(courseDTO.getCourseName());
                newCourse.setCourseDescription(courseDTO.getCourseDescription());
                newCourse.setCourseInstructor(courseDTO.getCourseInstructor());
                newCourse.setCourseTechnologies(technologies);
                courseRepository.save(newCourse);
                return ResponseEntity.ok("Course added successfully");
            } else {
                // Check if there is an existing course with **exactly** the same technologies
                for (Course existingCourse : existingCourses) {
                    Set<String> existingTechNames = existingCourse.getCourseTechnologies().stream()
                        .map(Technology::getTechnologyName)
                        .collect(Collectors.toSet());
    
                    if (existingTechNames.equals(newTechNames)) {
                        return ResponseEntity.badRequest().body("Course already exists with the same name, instructor, and technologies");
                    }
                }
    
                // If technologies differ, create a new course instead of updating
                Course newCourse = new Course();
                newCourse.setCourseName(courseDTO.getCourseName());
                newCourse.setCourseDescription(courseDTO.getCourseDescription());
                newCourse.setCourseInstructor(courseDTO.getCourseInstructor());
                newCourse.setCourseTechnologies(technologies);
                courseRepository.save(newCourse);
                return ResponseEntity.ok("New course added with different technologies");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding course: " + e.getMessage());
        }
    }
    
    @Transactional
    public ResponseEntity<String> deleteCourse(Long courseIdToDelete) {
        Optional<Course> optionalCourse = courseRepository.findById(courseIdToDelete);
        if (optionalCourse.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        Course course = optionalCourse.get();
        List<UserAccount> enrolledUsers = userAccountRepository.findByCoursesContaining(course);
        for (UserAccount user : enrolledUsers) {
            user.getCourses().remove(course);
        }
        userAccountRepository.saveAll(enrolledUsers);
        for (Technology tech : course.getCourseTechnologies()) {
            tech.getCourses().remove(course);
        }
        courseRepository.delete(course);
        return ResponseEntity.ok("Course deleted successfully");
    }

    @Transactional
    public ResponseEntity<String> editCourse(Long courseIdToEdit, CourseDTO courseDTO) {
        Optional<Course> courseToEdit = courseRepository.findById(courseIdToEdit);

        if (courseToEdit.isEmpty()) {
            return ResponseEntity.status(404).body("Course not found");
        }

        Course existingCourse = courseToEdit.get();

        existingCourse.setCourseName(courseDTO.getCourseName());
        existingCourse.setCourseDescription(courseDTO.getCourseDescription());
        existingCourse.setCourseInstructor(courseDTO.getCourseInstructor());

        Set<Technology> updatedTechnologies = new HashSet<>();
        for (TechnologyDTO techDTO : courseDTO.getCourseTechnologies()) {
            Technology technology = technologyRepository
                .findByTechnologyName(techDTO.getTechnologyName())
                .orElseGet(() -> {
                    Technology newTech = new Technology();
                    newTech.setTechnologyName(techDTO.getTechnologyName());
                    return technologyRepository.save(newTech);
                });

            updatedTechnologies.add(technology);
        }

        existingCourse.setCourseTechnologies(updatedTechnologies);
        courseRepository.save(existingCourse);
        return ResponseEntity.ok("Course updated successfully");
    }
    
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        if(courseRepository.count()!= 0){
            List<Course> courses = courseRepository.findAll();
            List<CourseDTO> courseDTOs = courses.stream()
                                                .map(CourseMapper.courseMapper::toCourseDTO)
                                                .collect(Collectors.toList());
            return ResponseEntity.ok(courseDTOs);
        }
        else {
            return ResponseEntity.noContent().build();
        }
    } 

    public ResponseEntity<List<Map<String, String>>> getAllUsers() {
        List<Object[]> users = userAccountRepository.findAllNonAdminUsers();
        if(users.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok( users.stream().map(user -> {
            Map<String, String> userMap = new HashMap<>();
            userMap.put("userName", (String) user[0]);
            userMap.put("emailId", (String) user[1]);
            return userMap;
        }).collect(Collectors.toList()));
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

    public ResponseEntity<String> updateProfile(UpdateProfileDTO updateProfileDTO) {
        Optional<UserAccount> userOpt = userAccountRepository.findById(updateProfileDTO.getUserName());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        UserAccount user = userOpt.get();
        if (updateProfileDTO.getEmailId() != null && !updateProfileDTO.getEmailId().isBlank()) {
            user.setEmailId(updateProfileDTO.getEmailId());
        }
        if (updateProfileDTO.getPassword() != null && !updateProfileDTO.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updateProfileDTO.getPassword()));
        }

        userAccountRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully");
    }
}