package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(final UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUserById(@PathVariable("id") Integer id) {
        return this.userRepository.findById(id);
    }
}
