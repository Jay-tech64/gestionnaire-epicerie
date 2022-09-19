package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@CrossOrigin
@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(final UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/users/{email}")
    public Optional<User> getUserByEmail(@PathVariable("email") String email) {
        return this.userRepository.findUserByEmail(email);
    }

    @PostMapping("/users")
    public User createNewUser(@RequestBody User user) {
        if (getUserByEmail(user.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This user already exist");
        }
        return this.userRepository.save(user);
    }
}
