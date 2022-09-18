package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/users")
    public User createNewUser(@RequestBody User user) {
        return this.userRepository.save(user);
    }
}
