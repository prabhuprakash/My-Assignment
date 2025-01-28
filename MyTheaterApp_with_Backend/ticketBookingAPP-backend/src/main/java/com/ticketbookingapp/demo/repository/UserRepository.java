package com.ticketbookingapp.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ticketbookingapp.demo.model.MyUser;

@Repository
public interface UserRepository extends JpaRepository<MyUser, String> {
    Optional<MyUser> findByUsername(String username);
}

