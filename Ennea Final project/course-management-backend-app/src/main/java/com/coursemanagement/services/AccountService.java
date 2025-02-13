package com.coursemanagement.services;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coursemanagement.dtos.SignInAccountDTO;
import com.coursemanagement.dtos.UserAccountDTO;
import com.coursemanagement.mappers.UserAccountMapper;
import com.coursemanagement.models.UserAccount;
import com.coursemanagement.repositories.UserAccountRepository;
import com.coursemanagement.utilities.JwtUtil;

@Service
public class AccountService {

  @Autowired
  private UserAccountRepository userAccountRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public ResponseEntity<String> createAccount(UserAccountDTO userAccountDTO ){
    System.out.println(userAccountDTO.getUserName()+userAccountDTO.getEmailId()+userAccountDTO.getPassword());
    if(userAccountRepository.existsById(userAccountDTO.getUserName())){
      return ResponseEntity.badRequest().body("User name already taken");
    }
    if(userAccountRepository.findByEmailId(userAccountDTO.getEmailId()).isPresent()){
      return ResponseEntity.badRequest().body("Email already registered");
    } 
    UserAccount userAccount = UserAccountMapper.userAccountMapper.toUserAccount(userAccountDTO);
    userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
    userAccount.setRole("USER");
    userAccountRepository.save(userAccount);
    return ResponseEntity.ok().body("Account created Successfully");
  }

  public ResponseEntity<Map<String, String>> signIn(SignInAccountDTO signInAccountDTO){
    if(!userAccountRepository.existsById(signInAccountDTO.getUserName())){
      return ResponseEntity.badRequest().body(Map.of("error", "Invalid User"));
    }
    UserAccount userAccount = userAccountRepository.findById(signInAccountDTO.getUserName()).get();

    if(!passwordEncoder.matches(signInAccountDTO.getPassword(), userAccount.getPassword())) {
      return ResponseEntity.badRequest().body(Map.of("error", "Invalid Password"));
    }
    Map<String, String> response = new HashMap<>();
    response.put("token", jwtUtil.generateToken(userAccount.getUserName(), userAccount.getRole(), userAccount.getEmailId()));
    response.put("username", userAccount.getUserName());
    response.put("role",userAccount.getRole());
    response.put("emailId",userAccount.getEmailId());
    response.put("enrolledcourses", userAccount.getCourses().stream()
      .map(course -> String.valueOf(course.getCourseId())) 
      .collect(Collectors.joining(",")) 
    );
    return ResponseEntity.ok(response);
  }

}
