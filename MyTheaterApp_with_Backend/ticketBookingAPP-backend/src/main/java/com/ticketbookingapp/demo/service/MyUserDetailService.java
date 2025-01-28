package com.ticketbookingapp.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticketbookingapp.demo.model.MyUser;
import com.ticketbookingapp.demo.repository.UserRepository;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository repo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = repo.findByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
    
    public String createUser(MyUser user) {
        // Check if username already exists
        if (repo.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists";
        }
        
        try {
            // Encode password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // Save user
            repo.save(user);
            return "User created successfully";
        } catch (Exception e) {
            return "Error creating user: " + e.getMessage();
        }
    }
}
