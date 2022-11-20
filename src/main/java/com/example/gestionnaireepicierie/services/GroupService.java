package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.Membership;
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
        User owner = userRepository.findUserByEmail(dto.owner().email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Group group = new Group(dto.name(), owner);
        groupRepository.save(group);
        return group;
    }

    public List<Group> getGroupsByUser(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return groupRepository.getGroupByOwner(user);
    }

    public Membership addUserToGroup(long groupId, String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Membership membership = new Membership(user, group, false);

        group.getMembers().add(membership);
        groupRepository.save(group);
        return membership;
    }

    public List<Membership> getMembersByGroup(long groupId) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return group.getMembers();
    }
}
