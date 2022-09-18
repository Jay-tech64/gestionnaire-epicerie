package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.repositories.UserRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(final UserRepository userRepository){
        this.userRepository = userRepository;
    }
}
