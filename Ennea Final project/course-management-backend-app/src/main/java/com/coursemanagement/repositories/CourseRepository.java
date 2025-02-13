package com.coursemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.coursemanagement.models.Course;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
       @Query("SELECT c FROM Course c WHERE c.courseName = :courseName AND c.courseInstructor = :instructor")
       List<Course> findByCourseNameAndInstructor(
              @Param("courseName") String courseName, 
              @Param("instructor") String instructor
       );
}
