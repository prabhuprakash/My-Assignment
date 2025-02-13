package com.coursemanagement.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.coursemanagement.dtos.UserAccountDTO;
import com.coursemanagement.models.UserAccount;

@Mapper
public interface UserAccountMapper {
  UserAccountMapper userAccountMapper=Mappers.getMapper(UserAccountMapper.class);
  @Mapping(target = "courses",ignore = true)
  @Mapping(target = "role",ignore = true)
  UserAccount toUserAccount(UserAccountDTO userAccountDTO);

  UserAccountDTO toUserAccount(UserAccount userAccount);
}
