import UserGroups from "../views/UserGroups";
import { useState } from "react";
import { createGroup } from "../services/GroupService";

const UserGroupsContainer = () => {
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    const handleCreateGroup = () => {
        const dto = {
            name: groupName,
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
        />
    );
};

export default UserGroupsContainer;
