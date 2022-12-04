package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.InvitationResponseDto;
import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.GroupDto;
import com.example.gestionnaireepicierie.controllers.payload.response.MembershipDto;
import com.example.gestionnaireepicierie.services.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @GetMapping("/groups/user/{email}")
    public ResponseEntity<List<GroupDto>> getGroupsByUser(@PathVariable String email){
        return ResponseEntity.ok(groupService.getGroupsByUser(email));
    }

    @GetMapping("/groups/{groupId}/get-members")
    public ResponseEntity<List<MembershipDto>> getMembersByGroup(@PathVariable String groupId){
        return ResponseEntity.ok(groupService.getMembersByGroup(Long.parseLong(groupId)));
    }

    @PostMapping("/new-group")
    public ResponseEntity<GroupDto> createGroup(@Valid @RequestBody NewGroupDto dto){
        return ResponseEntity.ok(groupService.createGroup(dto));
    }

    @PostMapping("/groups/{groupId}/add-user/{email}")
    public ResponseEntity<MembershipDto> addUserToGroup(@PathVariable String groupId, @PathVariable String email){
        return ResponseEntity.ok(groupService.addUserToGroup(Long.parseLong(groupId), email));
    }

    @PostMapping("/groups/{groupId}/accept-invitation")
    public ResponseEntity<Void> acceptInvitation(
            @PathVariable String groupId,
            @Valid @RequestBody InvitationResponseDto dto){
        groupService.acceptInvitation(Long.parseLong(groupId), dto);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/groups/{groupId}/decline-invitation")
    public ResponseEntity<Void> declineInvitation(
            @PathVariable String groupId,
            @Valid @RequestBody InvitationResponseDto dto){
        groupService.declineInvitation(Long.parseLong(groupId), dto);
        return ResponseEntity.accepted().build();
    }
}
