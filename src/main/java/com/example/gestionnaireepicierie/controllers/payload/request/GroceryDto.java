package com.example.gestionnaireepicierie.controllers.payload.request;

import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;

import javax.validation.constraints.NotBlank;
import java.util.List;

public record GroceryDto(
        @NotBlank Long id,
        @NotBlank String name,
        @NotBlank UserDto owner,
        @NotBlank List<ArticleDto> articles,
        @NotBlank float totalPrice
) {
}
