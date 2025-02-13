package com.coursemanagement.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.coursemanagement.dtos.TechnologyDTO;
import com.coursemanagement.models.Technology;

@Mapper
public interface TechnologyMapper {
  TechnologyMapper technologyMapper = Mappers.getMapper(TechnologyMapper.class);

  TechnologyDTO toTechnologyDTO(Technology technology);

  @Mapping(target = "technologyId", ignore = true)
  @Mapping(target = "courses", ignore = true)
  Technology technology(TechnologyDTO technologyDTO);
}
