package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carsmanagement.demo.dto.CarDTO;
import com.carsmanagement.demo.model.Car;

@Mapper(componentModel = "spring", uses = {DealershipMapper.class, FeatureMapper.class,OwnerMapper.class})
public interface CarMapper {
    
    @Mapping(target = "carId", ignore = true)
    Car toCar(CarDTO carDTO);

    CarDTO toCarDTO(Car car);
}
