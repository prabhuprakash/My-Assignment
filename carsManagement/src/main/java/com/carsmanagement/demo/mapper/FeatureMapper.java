package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carsmanagement.demo.dto.FeatureDTO;
import com.carsmanagement.demo.model.Feature;

@Mapper(componentModel = "spring")
public interface FeatureMapper {
  FeatureDTO toFeatureDTO(Feature feature);

  @Mapping(target= "cars", ignore=true)
  @Mapping(target = "featureId", ignore = true)
  Feature toFeature(FeatureDTO featureDTO);

}
