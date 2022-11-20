package com.example.gestionnaireepicierie.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "MEMBERSHIP")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class Membership {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @NonNull User owner;

    @JsonIgnore
    @ManyToOne
    @NonNull Group provider;

    @NonNull
    Boolean isActive;
}
