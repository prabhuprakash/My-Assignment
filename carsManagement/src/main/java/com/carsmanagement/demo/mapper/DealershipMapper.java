package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carsmanagement.demo.dto.DealershipDTO;
import com.carsmanagement.demo.model.Dealership;

@Mapper(componentModel = "spring")
public interface DealershipMapper {
	DealershipDTO toDealershipDTO(Dealership dealership);
	
	@Mapping(target= "cars", ignore=true)
	@Mapping(target = "dealershipId" , ignore = true)
	Dealership toDealership(DealershipDTO dealershipDTO);
}
