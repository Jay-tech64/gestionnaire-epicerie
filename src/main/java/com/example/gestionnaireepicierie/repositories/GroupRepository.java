package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Group;
import com.example.gestionnaireepicierie.entities.User;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;

public interface GroupRepository extends CrudRepository<Group, Long> {
    List<Group> getGroupByOwner(@NonNull User owner);

    Optional<Group> findGroupById(Long id);
}
