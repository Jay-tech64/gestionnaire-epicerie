package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Notification;
import com.example.gestionnaireepicierie.entities.User;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
    List<Notification> getNotificationByRecipient(@NonNull User recipient);
}
