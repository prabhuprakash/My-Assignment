package com.springboot.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.demo.model.Contact;
import com.springboot.demo.service.ContactService;

@RestController
public class ContactsController {
	
	@Autowired
	ContactService service;
	
	@GetMapping("/contacts")
	public List<Contact> getContacts() {
		return service.getContacts();
	}
	
	@GetMapping("/contacts/{name}")
	public List<Contact> getContact(@PathVariable String name) {
		
		return service.getContacts(name);
	}
	
	@PostMapping("/addcontact")
	public void addContact(@RequestBody Contact contact) {
		service.addContact(contact);
	}
	@PutMapping("/updatecontact")
	public void updateContact(@RequestBody Contact contact) {
		service.updateContact(contact);
	}
	@DeleteMapping("/deletecontact/{id}")
	public void deleteContact(@PathVariable int id) {
		service.deleteContact(id);
	}
}
