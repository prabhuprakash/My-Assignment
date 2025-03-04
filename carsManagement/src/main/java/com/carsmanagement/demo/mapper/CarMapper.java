package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.model.Car;

@Mapper
public interface CarMapper {
	CarMapper carMapper = Mappers.getMapper(CarMapper.class);
	
	CarDTO toCarDTO(Car car);
	@Mapping(target="carId",ignore=true)
	Car toCar(CarDTO carDTO);
}
