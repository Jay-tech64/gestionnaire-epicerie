package com.example.gestionnaireepicierie.controllers.payload.request;

import javax.validation.constraints.NotBlank;

public record ArticleDto(
        @NotBlank String name,
        @NotBlank float price
) {
}
