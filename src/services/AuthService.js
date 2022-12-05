import axios from "../api/axios";

export const signIn = async (userInfo) => {
    return axios.post("/sign-in", userInfo);
};

export const signUp = async (signUpInfo) => {
    return axios.post("/sign-up", signUpInfo);
};
