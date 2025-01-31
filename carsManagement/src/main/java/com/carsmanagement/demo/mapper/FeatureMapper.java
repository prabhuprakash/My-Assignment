package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.carsmanagement.demo.dto.FeatureDTO;
import com.carsmanagement.demo.model.Feature;

@Mapper
public interface FeatureMapper {
  FeatureMapper featureMapper = Mappers.getMapper(FeatureMapper.class);

  FeatureDTO toFeatureDTO(Feature feature);

  @Mapping(target= "cars", ignore=true)
  @Mapping(target = "featureId", ignore = true)
  Feature toFeature(FeatureDTO featureDTO);

}
