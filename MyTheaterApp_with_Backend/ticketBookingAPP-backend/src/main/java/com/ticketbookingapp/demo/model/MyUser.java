package com.ticketbookingapp.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyUser {
    @Id
    private String username;
    @Column(nullable = false)
    private String password;
}
