package com.example.gestionnaireepicierie.controllers.payload.request;

import javax.validation.constraints.NotBlank;

public record SignInDto(
        @NotBlank String email,
        @NotBlank String password
) {
}
