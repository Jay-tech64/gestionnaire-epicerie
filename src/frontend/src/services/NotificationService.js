import axios from "../api/axios";

export const getNotificationByUser = async (userEmail) => {
    return axios.get(`notification/user/${userEmail}`, {
        headers: { "Content-Type": "application/json" },
    });
};
