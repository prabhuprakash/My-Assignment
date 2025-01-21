package com.springboot.demo.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.demo.model.Contact;

@Repository
public interface ContactRepositry extends JpaRepository<Contact, Integer>{
	List<Contact> findByName(String name);
}
