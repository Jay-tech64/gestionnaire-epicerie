package com.example.gestionnaireepicierie.controllers.payload.request;

import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public record NewGroupDto(
        @NotBlank(message = "group-name-is-mandatory") String name,

        @NotNull(message = "owner-is-mandatory") UserDto owner,
        @NotNull(message = "members-are-mandatory") List<UserDto> members
){}
