package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.NewGroupDto;
import com.example.gestionnaireepicierie.services.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@AllArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @PostMapping("/new-group")
    public ResponseEntity<Void> createGroup(@RequestBody NewGroupDto dto){
        groupService.createGroup(dto);
        return ResponseEntity.accepted().build();
    }
}
