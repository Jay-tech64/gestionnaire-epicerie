package com.example.gestionnaireepicierie.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "NOTIFICATION")
@Data
@NoArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public class Notification {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @NonNull
    private User recipient;

    @NonNull
    private String message;

    @NonNull
    private Long groupId;
}
