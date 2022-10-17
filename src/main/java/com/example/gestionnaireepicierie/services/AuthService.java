package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.SignInDto;
import com.example.gestionnaireepicierie.controllers.payload.request.SignUpDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AuthService {
    private UserRepository userRepository;

    public UserDto signIn(SignInDto dto){
        User user = userRepository.findUserByEmailAndPassword(dto.email(), dto.password())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return new UserDto(user.getName(), user.getEmail());

    }

    public void signUp(SignUpDto dto) {
        if(userRepository.findUserByEmail(dto.email()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"email-taken");
        }
        User user = new User(dto.name(), dto.email(), dto.password());
        userRepository.save(user);
    }
}
