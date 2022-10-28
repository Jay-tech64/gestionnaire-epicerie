package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Grocery;
import com.example.gestionnaireepicierie.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface GroceryRepository extends CrudRepository<Grocery, Long> {

    List<Grocery> findAll();
    List<Grocery> getGroceriesByOwner(User owner);

    Optional<Grocery> getGroceryById(Long id);

    void deleteGroceryById(Long id);

    @Query("SELECT SUM(g.totalPrice) FROM Grocery g WHERE g.isCompleted = false AND g.owner = ?1")
    Float getTotalPriceOfAllGroceriesByOwner(User owner);



}
