import axios from "../api/axios";

export const createGrocery = async (dto) => {
    return axios.post("/groceries", JSON.stringify(dto), {
        headers: { "Content-Type": "application/json" },
    });
};

export const getGroceriesByUser = async (userEmail) => {
    return axios.get(`/groceries?email=${userEmail}`);
};

export const getAllGroceriesTotalPrice = async (userEmail) => {
    return axios.get(`/groceries/totalPrice?email=${userEmail}`);
};

export const updateGrocery = async (dto) => {
    return axios.put("/groceries", JSON.stringify(dto), {
        headers: { "Content-Type": "application/json" },
    });
};

export const deleteGrocery = async (groceryId) => {
    return axios.delete(`/groceries/${groceryId}`);
};
