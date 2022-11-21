package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.InvitationResponseDto;
import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.Membership;
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
    public ResponseEntity<List<Group>> getGroupsByUser(@PathVariable String email){
        return ResponseEntity.ok(groupService.getGroupsByUser(email));
    }

    @GetMapping("/groups/{groupId}/get-members")
    public ResponseEntity<List<Membership>> getMembersByGroup(@PathVariable String groupId){
        return ResponseEntity.ok(groupService.getMembersByGroup(Long.parseLong(groupId)));
    }

    @PostMapping("/new-group")
    public ResponseEntity<Group> createGroup(@Valid @RequestBody NewGroupDto dto){
        return ResponseEntity.ok(groupService.createGroup(dto));
    }

    @PostMapping("/groups/{groupId}/add-user/{email}")
    public ResponseEntity<Membership> addUserToGroup(@PathVariable String groupId, @PathVariable String email){
        return ResponseEntity.ok(groupService.addUserToGroup(Long.parseLong(groupId), email));
    }

    @PostMapping("/groups/{groupId}/accept-invitation")
    public ResponseEntity<Void> acceptInvitation(
            @PathVariable String groupId,
            @Valid @RequestBody InvitationResponseDto dto){
        groupService.acceptInvitation(Long.parseLong(groupId), dto);
        return ResponseEntity.accepted().build();
    }
}
