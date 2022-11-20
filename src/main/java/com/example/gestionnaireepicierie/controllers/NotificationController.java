package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.response.NotificationDto;
import com.example.gestionnaireepicierie.services.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/notification/user/{email}")
    public ResponseEntity<List<NotificationDto>> getNotificationsByUser(@PathVariable String email){
        return ResponseEntity.ok(notificationService.getNotificationsByUser(email));
    }
}
