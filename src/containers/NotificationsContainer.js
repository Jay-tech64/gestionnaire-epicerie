import React, { useEffect, useState } from "react";
import Notifications from "../views/Notifications";
import { getNotificationByUser } from "../services/NotificationService";
import { acceptInvitation, declineInvitation } from "../services/GroupService";

const NotificationsContainer = () => {
    const userEmail = localStorage.getItem("userEmail");
    const [notifications, setNotifications] = useState([]);

    const handleAccept = (notification) => {
        const dto = {
            notificationId: notification.notificationId,
            userEmail: userEmail,
        };
        acceptInvitation(notification.groupId, dto)
            .then((response) => {
                console.log(response);
            })
            .finally(() =>
                getNotificationByUser(userEmail)
                    .then((response) => {
                        setNotifications(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            )
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDecline = (notification) => {
        const dto = {
            notificationId: notification.notificationId,
            userEmail: userEmail,
        };
        declineInvitation(notification.groupId, dto)
            .then((response) => {
                console.log(response);
            })
            .finally(() =>
                getNotificationByUser(userEmail)
                    .then((response) => {
                        setNotifications(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            )
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getNotificationByUser(userEmail)
            .then((response) => {
                console.log(response.data);
                setNotifications(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Notifications
            notifications={notifications}
            accept={handleAccept}
            decline={handleDecline}
        />
    );
};

export default NotificationsContainer;
