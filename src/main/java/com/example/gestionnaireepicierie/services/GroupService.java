package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.GroupRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@AllArgsConstructor
public class GroupService {
    private GroupRepository groupRepository;
    private UserRepository userRepository;

    public Group createGroup(NewGroupDto dto) {
        List<User> userList = dto.members().stream().map(userDto -> userRepository.findUserByEmail(
                userDto.email()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .toList();
        User owner = userRepository.findUserByEmail(dto.owner().email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Group group = new Group(dto.name(), owner, userList);
        groupRepository.save(group);
        return group;
    }

    public List<Group> getGroupsByUser(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return groupRepository.getGroupByOwner(user);
    }

    public UserDto addUserToGroup(long groupId, String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        group.getMembers().add(user);
        groupRepository.save(group);
        return new UserDto(user.getName(), user.getEmail());
    }

    public List<UserDto> getMembersByGroup(long groupId) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return group.getMembers().stream().map(member -> new UserDto(member.getName(), member.getEmail())).toList();
    }
}
