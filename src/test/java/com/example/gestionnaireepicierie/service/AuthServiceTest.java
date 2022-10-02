package com.example.gestionnaireepicierie.service;

import com.example.gestionnaireepicierie.controllers.payload.request.SignInDto;
import com.example.gestionnaireepicierie.controllers.payload.request.SignUpDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import com.example.gestionnaireepicierie.services.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AuthServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @Test
    void signInHappyDay() {
        // Arrange
        SignInDto mockSignIn = new SignInDto("arya@test.com", "It's a secret");
        User mockUser = new User("Arya", "arya@test.com", "It's a secret");
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(mockUser));

        // Act
        UserDto userDto = authService.signIn(mockSignIn);

        // Assert
        assertThat(userDto.email()).isEqualTo("arya@test.com");
        assertThat(userDto.name()).isEqualTo("Arya");
    }

    @Test
    void signInBadEmail() {
        // Arrange
        SignInDto mockSignIn = new SignInDto("bad email", "It's a secret");

        // Act & Assert
        assertThatThrownBy(() -> authService.signIn(mockSignIn))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void signInWrongPassword() {
        SignInDto mockSignIn = new SignInDto("arya@test.com", "Wrong password");

        // Act & Assert
        assertThatThrownBy(() -> authService.signIn(mockSignIn))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.UNAUTHORIZED);
    }

//    @Test
//    void signUpHappyDay() {
//        // Arrange
//        SignUpDto mockSignUp = new SignUpDto("Arya", "arya@test.com", "It's a secret");
//        User expectedUser = new User("Arya", "arya@test.com", "It's a secret");
//        when(userRepository.save(any(User.class))).thenReturn(expectedUser);
//
//        // Act
//        authService.signUp(mockSignUp);
//
//        // Assert
//        assertThat(userRepository.findUserByEmail("arya@test.com").isPresent()).isTrue();
//    }
}
