package com.example.gestionnaireepicierie.controllers.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.List;

public record GroceryDto(
        @NotBlank String name,
        @NotBlank List<ArticleDto> articles,
        @NotBlank float totalPrice
) {
}
