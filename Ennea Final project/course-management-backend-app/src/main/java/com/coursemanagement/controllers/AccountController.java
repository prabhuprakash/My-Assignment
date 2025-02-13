package com.coursemanagement.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.coursemanagement.dtos.SignInAccountDTO;
import com.coursemanagement.dtos.UserAccountDTO;
import com.coursemanagement.services.AccountService;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/account")

public class AccountController {

  private final AccountService accountService;
  
  public AccountController(AccountService accountService){
    this.accountService = accountService;
  }

  @PostMapping("/createaccount")
  public ResponseEntity<String> createAccount(@Valid @RequestBody UserAccountDTO userAccountDTO) {
      return accountService.createAccount(userAccountDTO);
  }
  
  @PostMapping("/signin")
  public ResponseEntity<Map<String, String>> signIn(@Valid @RequestBody SignInAccountDTO signInAccountDTO) {
    return accountService.signIn(signInAccountDTO);
  }
}
