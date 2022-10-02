package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.SignInDto;
import com.example.gestionnaireepicierie.controllers.payload.request.SignUpDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody SignUpDto dto) {
        authService.signUp(dto);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<UserDto> signIn(@Valid @RequestBody SignInDto dto) {
        return ResponseEntity.ok(authService.signIn(dto));
    }
}
