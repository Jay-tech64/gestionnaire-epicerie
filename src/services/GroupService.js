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

export const addUserToGroup = async (groupId, userEmail) => {
    return axios.post(
        `/groups/${groupId}/add-user/${userEmail}`,
        {},
        {
            headers: { "Content-Type": "application/json" },
        }
    );
};

export const acceptInvitation = async (groupId, dto) => {
    return axios.post(`/groups/${groupId}/accept-invitation`, dto, {
        headers: { "Content-Type": "application/json" },
    });
};

export const declineInvitation = async (groupId, dto) => {
    return axios.post(`/groups/${groupId}/decline-invitation`, dto, {
        headers: { "Content-Type": "application/json" },
    });
};

export const getMembersByGroup = async (groupId) => {
    return axios.get(`/groups/${groupId}/get-members`, {
        headers: { "Content-Type": "application/json" },
    });
};
