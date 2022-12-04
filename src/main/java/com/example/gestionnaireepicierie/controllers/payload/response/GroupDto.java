package com.example.gestionnaireepicierie.controllers.payload.response;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public record GroupDto(
        @NotNull(message = "groupId-is-mandatory") Long groupId,
        @NotBlank(message = "group-name-is-mandatory") String name,

        @NotNull(message = "owner-is-mandatory") UserDto owner,
        @NotNull(message = "members-are-mandatory") List<UserDto> members
) {
}
