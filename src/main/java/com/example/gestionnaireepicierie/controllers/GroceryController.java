package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import com.example.gestionnaireepicierie.services.GroceryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class GroceryController {

    GroceryService groceryService;

    @PostMapping("/groceries")
    public ResponseEntity<Void> addGrocery(@RequestBody GroceryDto dto){
        groceryService.addGrocery(dto);
        return ResponseEntity.accepted().build();
    }
}
