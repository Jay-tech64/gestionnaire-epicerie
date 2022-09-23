package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "NAME")
    @NonNull private String name;

    @Column(name = "EMAIL")
    @NonNull private String email;

    @Column(name = "PASSWORD")
    @NonNull private String password;
}
