package com.carsmanagement.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.carsmanagement.demo.dto.OwnerDTO;
import com.carsmanagement.demo.model.Owner;

@Mapper(componentModel = "spring")
public interface OwnerMapper {
	OwnerDTO toOwnerDTO(Owner owner);
	@Mapping(target="cars", ignore=true)
	@Mapping(target = "ownerId", ignore = true)
	Owner toOwner(OwnerDTO ownerDTO);
}
