package com.example.gestionnaireepicierie.controller;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.services.GroupService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class GroupControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    GroupService groupService;

    @Test
    void createGroupHappyDay() throws Exception{
        // Arrange
        List<UserDto> mockUserDto = List.of(new UserDto("Jérémy", "jeremy@test.com"));
        UserDto mockOwner = new UserDto("Jérémy", "jeremy@test.com");
        NewGroupDto dto = new NewGroupDto("Famille Mailhot", mockOwner, mockUserDto);

        // Act & Assert
        mockMvc.perform(post("/new-group")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(dto))).andExpect(status().isAccepted());
    }

    @Test
    void createGroupBadRequest() throws Exception{
        // Arrange
        NewGroupDto dto = new NewGroupDto(null, null, null);

        mockMvc.perform(post("/new-group")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(dto))).andExpect(status().isBadRequest());


    }


    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
