package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "GROUPS")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class Group {

    @Id
    @GeneratedValue
    private Long id;
    
    @NonNull private String name;
    
    @OneToMany
    @NonNull private List<User> members;
}