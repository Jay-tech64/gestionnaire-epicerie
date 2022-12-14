package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull private String name;

    @NonNull private String email;

    @NonNull private String password;

    @OneToMany
    private List<Grocery> groceries;

    @OneToMany
    private List<Membership> subscriptions;

    @OneToMany
    private List<Group> ownedGroup;

    @OneToMany
    private List<Notification> notifications;
}
