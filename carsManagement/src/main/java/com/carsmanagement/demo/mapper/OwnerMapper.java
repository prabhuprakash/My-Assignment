package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.carsmanagement.demo.dto.OwnerDTO;
import com.carsmanagement.demo.model.Owner;

@Mapper
public interface OwnerMapper {
	OwnerMapper ownerMapper = Mappers.getMapper(OwnerMapper.class);
	
	OwnerDTO toOwnerDTO(Owner owner);
	
	@Mapping(target = "ownerId", ignore = true)
	Owner toOwner(OwnerDTO ownerDTO);
}
