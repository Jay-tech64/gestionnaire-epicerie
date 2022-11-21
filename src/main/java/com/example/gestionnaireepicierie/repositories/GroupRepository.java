package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Group;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface GroupRepository extends CrudRepository<Group, Long> {
    Optional<Group> findGroupById(Long id);
}
