package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Grocery;
import org.springframework.data.repository.CrudRepository;

public interface GroceryRepository extends CrudRepository<Grocery, Integer> {
}
