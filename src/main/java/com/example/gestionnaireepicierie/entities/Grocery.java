package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "GROCERIES")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class Grocery {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull private String name;

    @ManyToOne
    @NonNull private User owner;

    @ManyToMany
    @NonNull private List<Article> articles;

    @NonNull private float totalPrice;

    @NonNull private boolean isCompleted;
}
