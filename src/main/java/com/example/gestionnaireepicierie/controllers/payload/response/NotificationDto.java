package com.example.gestionnaireepicierie.controllers.payload.response;

import javax.validation.constraints.NotBlank;

public record NotificationDto(
        @NotBlank UserDto recipient,
        @NotBlank String message
) {
}
