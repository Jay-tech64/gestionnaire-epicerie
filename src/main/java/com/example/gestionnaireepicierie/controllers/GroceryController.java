package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroceryController {

    @PostMapping("/groceries")
    public ResponseEntity<Void> addGrocery(@RequestBody GroceryDto dto){
        return null;
    }
}
