import axios from "../api/axios";

export const getGroupsByUser = async (userEmail) => {
    return axios.get(`groups/user/${userEmail}`, {
        headers: { "Content-Type": "application/json" },
    });
};

export const createGroup = async (dto) => {
    return axios.post("/new-group", dto, {
        headers: { "Content-Type": "application/json" },
    });
};
