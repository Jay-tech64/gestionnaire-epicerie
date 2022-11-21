package com.example.gestionnaireepicierie.service;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.Membership;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.GroupRepository;
import com.example.gestionnaireepicierie.repositories.NotificationRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import com.example.gestionnaireepicierie.services.GroupService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class GroupeServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    GroupRepository groupRepository;

    @Mock
    NotificationRepository notificationRepository;

    @InjectMocks
    private GroupService groupService;

    @Test
    void createGroupHappyDay(){
        // Arrange
        List<UserDto> mockUserDto = List.of(new UserDto("Jérémy", "jeremy@test.com"));
        UserDto mockOwner = new UserDto("Jérémy", "jeremy@test.com");
        NewGroupDto mockNewGroupDto = new NewGroupDto("Famille Mailhot", mockOwner, mockUserDto);
        User mockUser = new User("Jérémy", "jeremy@test.com", "It's a secret");
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(mockUser));

        // Act
        Group group = groupService.createGroup(mockNewGroupDto);

        // Assert
        assertThat(group.getMembers().size()).isEqualTo(1);
    }

    @Test
    void createGroupUserNotFound(){
        // Arrange
        List<UserDto> mockUserDto = List.of(new UserDto("Jérémy", "jeremy@test.com"));
        UserDto mockOwner = new UserDto("Jérémy", "jeremy@test.com");
        NewGroupDto mockNewGroupDto = new NewGroupDto("Famille Mailhot", mockOwner, mockUserDto);

        // Act & Assert
        assertThatThrownBy(() -> groupService.createGroup(mockNewGroupDto))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.NOT_FOUND);

    }

    @Test
    void getGroupsByOwnerHappyDay(){
        // Arrange
        User mockUser = new User("Jérémy", "jeremy@test.com", "123");
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(mockUser));

        // Act
        groupService.getGroupsByUser(mockUser.getEmail());

        // Assert
        verify(userRepository).findUserByEmail(mockUser.getEmail());
    }

    @Test
    void getGroupsByOwnerNotFound(){
        // Arrange
        User mockUser = new User("Jérémy", "jeremy@test.com", "123");

        // Act
        assertThatThrownBy(() -> groupService.getGroupsByUser(mockUser.getEmail()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void addUserToGroupHappyDay(){
        User mockOwner = new User("Jérémy", "jeremy@test.com", "123");
        User mockUser = new User("Marko", "marko@test.com", "123");
        Group mockGroup = new Group("Les chasseurs de rabais", mockOwner);
        mockGroup.setId(1L);
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(mockUser));
        when(groupRepository.findGroupById(anyLong())).thenReturn(Optional.of(mockGroup));

        groupService.addUserToGroup(mockGroup.getId(), mockUser.getEmail());

        assertThat(mockGroup.getMembers().size()).isEqualTo(2);
    }

    @Test
    void addUserToGroupGroupNotFound(){
        User mockOwner = new User("Jérémy", "jeremy@test.com", "123");
        User mockUser = new User("Marko", "marko@test.com", "123");
        Group mockGroup = new Group("Les chasseurs de rabais", mockOwner);
        mockGroup.setId(1L);
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(mockUser));

        assertThatThrownBy(() -> groupService.addUserToGroup(mockGroup.getId(), mockUser.getEmail()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void addUserToGroupUserNotFound(){
        User mockOwner = new User("Jérémy", "jeremy@test.com", "123");
        User mockUser = new User("Marko", "marko@test.com", "123");
        Group mockGroup = new Group("Les chasseurs de rabais", mockOwner);
        mockGroup.setId(1L);

        assertThatThrownBy(() -> groupService.addUserToGroup(mockGroup.getId(), mockUser.getEmail()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void getMembersByGroupHappyDay(){
        User mockOwner = new User("Jérémy", "jeremy@test.com", "123");
        User mockUser = new User("Marko", "marko@test.com", "123");
        Group mockGroup = new Group("Les chasseurs de rabais", mockOwner);
        Membership mockMembership = new Membership(mockUser, mockGroup, false);
        mockGroup.getMembers().add(mockMembership);
        mockGroup.setId(1L);
        when(groupRepository.findGroupById(anyLong())).thenReturn(Optional.of(mockGroup));

        List<Membership> userDtos = groupService.getMembersByGroup(mockGroup.getId());

        assertThat(userDtos.size()).isEqualTo(2);
    }

    @Test
    void getMembersByGroupGroupNotFound(){
        User mockOwner = new User("Jérémy", "jeremy@test.com", "123");
        User mockUser = new User("Marko", "marko@test.com", "123");
        Group mockGroup = new Group("Les chasseurs de rabais", mockOwner);
        Membership mockMembership = new Membership(mockOwner, mockGroup, true);
        Membership mockMembership2 = new Membership(mockUser, mockGroup, false);
        mockGroup.getMembers().add(mockMembership);
        mockGroup.getMembers().add(mockMembership2);
        mockGroup.setId(1L);

        assertThatThrownBy(() -> groupService.getMembersByGroup(mockGroup.getId()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.NOT_FOUND);
    }
}
