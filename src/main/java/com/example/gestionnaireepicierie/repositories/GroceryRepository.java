package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Grocery;
import com.example.gestionnaireepicierie.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface GroceryRepository extends CrudRepository<Grocery, Long> {

    List<Grocery> findAll();
    List<Grocery> getGroceriesByOwner(User owner);

    Optional<Grocery> getGroceryById(Long id);

    void deleteGroceryById(Long id);


}
