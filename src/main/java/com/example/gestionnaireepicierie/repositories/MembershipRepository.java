package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Membership;
import com.example.gestionnaireepicierie.entities.User;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MembershipRepository extends CrudRepository<Membership, Long> {
    List<Membership> getMembershipsByOwner(@NonNull User owner);
}
