package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
