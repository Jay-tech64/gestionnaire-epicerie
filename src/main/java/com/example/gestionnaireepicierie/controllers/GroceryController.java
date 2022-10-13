package com.example.gestionnaireepicierie.controllers;

import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import com.example.gestionnaireepicierie.services.GroceryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class GroceryController {

    GroceryService groceryService;

    @GetMapping("/groceries")
    public ResponseEntity<List<GroceryDto>> getGroceries(@RequestParam String email) {
        return ResponseEntity.ok(groceryService.getGroceriesByUser(email));
    }

    @PostMapping("/groceries")
    public ResponseEntity<Void> addGrocery(@RequestBody GroceryDto dto) {
        groceryService.addGrocery(dto);
        return ResponseEntity.accepted().build();
    }

    @PutMapping("/groceries")
    public ResponseEntity<Void> updateGrocery(@RequestBody GroceryDto dto) {
        groceryService.updateGrocery(dto);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/groceries/{id}")
    public ResponseEntity<Void> deleteGrocery(@PathVariable String id) {
        try {
            groceryService.deleteGrocery(Long.parseLong(id));
        }
        catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Variable id must be a number");
        }
        return ResponseEntity.accepted().build();
    }

}
