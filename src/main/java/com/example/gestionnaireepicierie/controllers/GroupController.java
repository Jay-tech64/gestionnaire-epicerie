package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.entities.Group;
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

    @PostMapping("/new-group")
    public ResponseEntity<Void> createGroup(@Valid @RequestBody NewGroupDto dto){
        groupService.createGroup(dto);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/groups/{groupId}/add-user/{email}")
    public ResponseEntity<Void> addUserToGroup(@PathVariable String groupId, @PathVariable String email){
        groupService.addUserToGroup(Long.parseLong(groupId), email);
        return ResponseEntity.accepted().build();
    }
}
