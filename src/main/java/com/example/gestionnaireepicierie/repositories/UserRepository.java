package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);
}
