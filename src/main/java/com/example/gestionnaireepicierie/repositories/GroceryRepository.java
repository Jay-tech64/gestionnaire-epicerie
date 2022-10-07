package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Grocery;
import com.example.gestionnaireepicierie.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GroceryRepository extends CrudRepository<Grocery, Long> {
    List<Grocery> getGroceriesByOwner(User owner);

    Grocery getGroceryById(Long id);
}
