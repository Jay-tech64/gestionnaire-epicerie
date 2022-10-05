package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ARTICLE")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class Article {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull private String name;

    @NonNull private float price;

    @ManyToMany
    private List<Grocery> grocery;
}
