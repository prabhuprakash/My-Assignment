package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.carsmanagement.demo.dto.DealershipDTO;
import com.carsmanagement.demo.model.Dealership;

@Mapper
public interface DealershipMapper {
	DealershipMapper dealershipMapper = Mappers.getMapper(DealershipMapper.class);
	
	DealershipDTO toDealershipDTO(Dealership dealership);
	
	@Mapping(target = "dealershipId" , ignore = true)
	Dealership toDealership(DealershipDTO dealershipDTO);
}
