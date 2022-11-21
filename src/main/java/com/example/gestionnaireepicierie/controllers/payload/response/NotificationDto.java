package com.example.gestionnaireepicierie.controllers.payload.response;

import javax.validation.constraints.NotBlank;

public record NotificationDto(
        @NotBlank Long notificationId,
        @NotBlank Long groupId,
        @NotBlank String message,
        @NotBlank String userEmail
) {
}
