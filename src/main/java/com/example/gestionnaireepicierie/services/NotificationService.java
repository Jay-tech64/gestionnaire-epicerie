package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.response.NotificationDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.NotificationRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {
    private UserRepository userRepository;
    private NotificationRepository notificationRepository;
    public List<NotificationDto> getNotificationsByUser(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return notificationRepository.getNotificationByRecipient(user).stream().map(
                notification -> new NotificationDto(
                        new UserDto(user.getName(), user.getEmail()),
                        notification.getMessage()
                )
        ).toList();
    }
}
