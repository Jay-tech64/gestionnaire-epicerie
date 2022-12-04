package com.example.gestionnaireepicierie.controllers.payload.response;

import javax.validation.constraints.NotNull;

public record MembershipDto (
        @NotNull Boolean isActive,
        @NotNull UserDto owner
){
}
