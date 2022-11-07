import axios from "../api/axios";

export const createGroup = async (dto) => {
    return axios.post("/new-group", dto, {
        headers: { "Content-Type": "application/json" },
    });
};
