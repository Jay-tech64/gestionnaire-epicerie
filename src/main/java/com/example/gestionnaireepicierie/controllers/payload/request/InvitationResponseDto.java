package com.example.gestionnaireepicierie.controllers.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record InvitationResponseDto(
        @NotNull(message = "notification-id-is-mandatory") Long notificationId,
        @NotBlank(message = "user-email-is-required") String userEmail
) {
}
