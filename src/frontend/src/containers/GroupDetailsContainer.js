import React, { useEffect, useState } from "react";
import GroupDetails from "../views/GroupDetails";
import { useLocation } from "react-router-dom";
import { getMembersByGroup } from "../services/GroceryService";
import { addUserToGroup } from "../services/GroupService";

const GroupDetailsContainer = () => {
    const [show, setShow] = useState(false);
    const [userToAdd, setUserToAdd] = useState("");
    const [members, setMembers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const { state } = location;
    const groupId = state?.id;
    const groupName = state?.name;
    const owner = state?.owner;

    useEffect(() => {
        getMembersByGroup(groupId)
            .then((response) => {
                console.log(response.data);
                setMembers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAddUser = (e) => {
        e.preventDefault();
        addUserToGroup(groupId, userToAdd)
            .then((response) => {
                setMembers([...members, response.data]);
                setUserToAdd("");
                setShow(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                    setErrorMessage("Cet utilisateur n'existe pas.");
                }
                if (err.response.status === 409) {
                    setErrorMessage(
                        "Vous ne pouvez pas vous invitez vous-même. ¯\\_(ツ)_/¯"
                    );
                }
            });
    };
    return (
        <GroupDetails
            groupName={groupName}
            members={members}
            owner={owner}
            show={show}
            closeModal={() => setShow(false)}
            showModal={() => setShow(true)}
            userToAdd={userToAdd}
            changeUserToAdd={({ target }) => {
                setUserToAdd(target.value);
                setErrorMessage("");
            }}
            addUser={handleAddUser}
            errorMessage={errorMessage}
        />
    );
};

export default GroupDetailsContainer;
