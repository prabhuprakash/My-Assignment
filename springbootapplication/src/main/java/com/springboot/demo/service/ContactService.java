package com.springboot.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.demo.model.Contact;
import com.springboot.demo.repositry.ContactRepositry;

@Service
public class ContactService {
	@Autowired
	ContactRepositry repo;

	public List<Contact> getContacts(){
		return repo.findAll();
	 }
	
	public List<Contact> getContacts(String name) {
		
		return repo.findByName(name);
	}
	public void addContact(Contact contact) {
		repo.save(contact);
	}
	
	public void updateContact(Contact updateContact) {
		Optional<Contact> existingContact = repo.findById(updateContact.getSno());

	    if (existingContact.isPresent()) {
	        // Update the fields of the contact
	        Contact contact = existingContact.get();
	        contact.setName(updateContact.getName());
	        contact.setPhoneNumber(updateContact.getPhoneNumber());
	        
	        // Save the updated contact back to the database
	        repo.save(contact);
	    } else {
	        throw new IllegalArgumentException("Contact with sno " + updateContact.getSno() + " not found.");
	    }
	}
	
	public void deleteContact(int id) {
		repo.deleteById(id);
		
		
	}
}
