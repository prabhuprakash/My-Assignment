package com.coursemanagement.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.coursemanagement.dtos.CourseDTO;
import com.coursemanagement.models.Course;

@Mapper
public interface CourseMapper {
  CourseMapper courseMapper = Mappers.getMapper(CourseMapper.class);
  @Mapping(target = "courseTechnologies",ignore = true)
  @Mapping(target = "courseId",ignore = true)
  @Mapping(target = "users",ignore = true)
  Course toCourse(CourseDTO courseDTO);

  CourseDTO toCourseDTO(Course course);
}
