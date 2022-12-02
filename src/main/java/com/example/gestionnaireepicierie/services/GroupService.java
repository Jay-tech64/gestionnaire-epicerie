package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.InvitationResponseDto;
import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.Membership;
import com.example.gestionnaireepicierie.entities.Notification;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.GroupRepository;
import com.example.gestionnaireepicierie.repositories.MembershipRepository;
import com.example.gestionnaireepicierie.repositories.NotificationRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class GroupService {
    private GroupRepository groupRepository;
    private UserRepository userRepository;
    private NotificationRepository notificationRepository;

    private MembershipRepository membershipRepository;

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
        List<Membership> membershipList = membershipRepository.getMembershipsByOwner(user);

        return membershipList.stream().map(Membership::getProvider).toList();
    }

    public Membership addUserToGroup(long groupId, String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Membership membership = new Membership(user, group, false);
        Notification notification = new Notification(
                user,
                group.getOwner().getName() + " vous invite à son groupe \"" + group.getName() + "\"",
                groupId);
        notificationRepository.save(notification);
        group.getMembers().add(membership);
        groupRepository.save(group);
        return membership;
    }

    public List<Membership> getMembersByGroup(long groupId) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return group.getMembers();
    }

    @Transactional
    public void acceptInvitation(long groupId, InvitationResponseDto dto) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Membership member = group.getMembers().stream().filter(membership ->
                membership.getOwner().getEmail()
                        .equals(dto.userEmail())).findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        member.setIsActive(true);
        notificationRepository.deleteNotificationById(dto.notificationId());

        groupRepository.save(group);
    }

    @Transactional
    public void declineInvitation(long groupId, InvitationResponseDto dto) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Membership member = group.getMembers().stream().filter(membership ->
                        membership.getOwner().getEmail()
                                .equals(dto.userEmail())).findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        group.getMembers().remove(member);
        membershipRepository.deleteByOwnerAndProvider(member.getOwner(), group);
        notificationRepository.deleteNotificationById(dto.notificationId());

        groupRepository.save(group);
    }
}
