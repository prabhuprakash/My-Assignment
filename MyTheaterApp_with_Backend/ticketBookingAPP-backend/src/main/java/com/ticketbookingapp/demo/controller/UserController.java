package com.ticketbookingapp.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ticketbookingapp.demo.model.MyUser;
import com.ticketbookingapp.demo.service.JwtService;
import com.ticketbookingapp.demo.service.MyUserDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private MyUserDetailService myUserDetailService;
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody MyUser user) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
			);
			if (authentication.isAuthenticated()) {
				String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(user.getUsername()));
				return ResponseEntity.ok(token);
			} 
			return ResponseEntity.badRequest().body("Authentication failed");
		} catch (BadCredentialsException e) {
			return ResponseEntity.badRequest().body("Invalid username or password");
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.badRequest().body("User not found");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Authentication failed: " + e.getMessage());
		}
	}
	
	@PostMapping("/signup")
	public String signUp(@RequestBody MyUser user) {
		return myUserDetailService.createUser(user);
	}
}
