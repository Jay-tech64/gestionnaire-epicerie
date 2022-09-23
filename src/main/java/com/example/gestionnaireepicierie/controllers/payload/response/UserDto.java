package com.example.gestionnaireepicierie.controllers.payload.response;

import javax.validation.constraints.NotBlank;

public record UserDto(
        @NotBlank String name,
        @NotBlank String email
) {
}
