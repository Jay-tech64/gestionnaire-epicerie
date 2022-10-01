import axios from "../api/axios";

export const createGrocery = async (dto) => {
    return axios.post("/groceries", JSON.stringify(dto), {
        headers: { "Content-Type": "application/json" },
    });
};

export const getGroceriesByUser = async (userEmail) => {
    return axios.get(`/groceries?email=${userEmail}`);
};
