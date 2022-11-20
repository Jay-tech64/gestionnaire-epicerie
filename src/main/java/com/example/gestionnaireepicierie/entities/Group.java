package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "GROUPS")
@Data
@NoArgsConstructor
public class Group {

    @Id
    @GeneratedValue
    private Long id;
    
    @NonNull private String name;

    @ManyToOne
    @NonNull private User owner;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Membership> members;

    public Group(@NonNull String name, @NonNull User owner){
        this.name = name;
        this.owner = owner;
        this.members = new ArrayList<>();
        this.members.add(new Membership(this.owner, this, true));
    }
}
