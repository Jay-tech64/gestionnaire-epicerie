package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.InvitationResponseDto;
import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.GroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.MembershipDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
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

    public GroupDto createGroup(NewGroupDto dto) {
        User owner = userRepository.findUserByEmail(dto.owner().email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Group group = new Group(dto.name(), owner);
        groupRepository.save(group);
        return new GroupDto(
                group.getId(),
                group.getName(),
                new UserDto(group.getOwner().getName(), group.getOwner().getEmail()),
                group.getMembers().stream().map(membership -> new UserDto(
                                membership.getOwner().getName(), membership.getOwner().getEmail())
                ).toList()
        );
    }

    public List<GroupDto> getGroupsByUser(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<Membership> membershipList = membershipRepository.getMembershipsByOwner(user);

        return membershipList.stream().map(membership ->
                new GroupDto(
                        membership.getProvider().getId(),
                        membership.getProvider().getName(),
                        new UserDto(
                                membership.getProvider().getOwner().getName(),
                                membership.getProvider().getOwner().getEmail()),
                        membership.getProvider().getMembers().stream().map(membership1 ->
                                new UserDto(
                                        membership1.getOwner().getName(),
                                        membership1.getOwner().getEmail())).toList()
                )).toList();
    }

    public MembershipDto addUserToGroup(long groupId, String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<User> groupUsers = group.getMembers().stream().map(Membership::getOwner).toList();
        if (groupUsers.contains(user)){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        Membership membership = new Membership(user, group, false);
        Notification notification = new Notification(
                user,
                group.getOwner().getName() + " vous invite ?? son groupe \"" + group.getName() + "\"",
                groupId);
        notificationRepository.save(notification);
        group.getMembers().add(membership);
        groupRepository.save(group);
        return new MembershipDto(
                membership.getIsActive(),
                new UserDto(
                        membership.getOwner().getName(),
                        membership.getOwner().getEmail()));
    }

    public List<MembershipDto> getMembersByGroup(long groupId) {
        Group group = groupRepository.findGroupById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return group.getMembers().stream().map(membership ->
                new MembershipDto(
                        membership.getIsActive(),
                        new UserDto(membership.getOwner().getName(), membership.getOwner().getEmail())))
                .toList();
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
