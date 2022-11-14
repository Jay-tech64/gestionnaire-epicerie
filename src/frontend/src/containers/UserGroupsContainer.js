import UserGroups from "../views/UserGroups";
import { useEffect, useState } from "react";
import { createGroup, getGroupsByUser } from "../services/GroupService";

const UserGroupsContainer = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        getGroupsByUser(email)
            .then((response) => {
                console.log(response.data);
                setUserGroups(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        const dto = {
            name: groupName,
            owner: {
                name: name,
                email: email,
            },
            members: [
                {
                    name: name,
                    email: email,
                },
            ],
        };

        createGroup(dto)
            .then((response) => {
                console.log(response);
                setUserGroups([...userGroups, response.data]);
                setGroupName("");
                setShow(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <UserGroups
            show={show}
            closeModal={() => setShow(false)}
            showModal={() => setShow(true)}
            groupName={groupName}
            changeGroupName={({ target }) => setGroupName(target.value)}
            createGroup={handleCreateGroup}
            userGroups={userGroups}
        />
    );
};

export default UserGroupsContainer;
