import UserGroups from "../views/UserGroups";
import React, { useEffect, useState } from "react";
import { createGroup, getGroupsByUser } from "../services/GroupService";
import InputModal from "../components/InputModal";

const UserGroupsContainer = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [show, setShow] = useState(false);
    const [modalValue, setModalValue] = useState("");
    const [mode, setMode] = useState("");
    const [modal, setModal] = useState({
        title: "",
        label: "",
        type: "",
        placeholder: "",
    });
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        getGroupsByUser(email)
            .then((response) => {
                console.log("allo", response.data);
                setUserGroups(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleShowModal = (selectedMode) => {
        setMode(selectedMode);
        if (selectedMode === "CREATE") {
            setModal({
                title: "Création d'un groupe",
                label: "Entrez le nom du groupe à créer",
                type: "text",
                placeholder: "Ex. Les chasseurs de rabais",
            });
        } else if (selectedMode === "JOIN") {
            setModal({
                title: "Rejoindre un groupe",
                label: "Entrez le courriel du propriétaire du groupe que vous voulez rejoindre.",
                type: "email",
                placeholder: "Ex. exemple@test.com",
            });
        }
        setShow(true);
    };

    const handleCreateGroup = (e) => {
        e.preventDefault();
        const dto = {
            name: modalValue,
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
                console.log("wazza", response.data);
                setUserGroups([...userGroups, response.data]);
                setModalValue("");
                setShow(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleJoinGroup = (e) => {
        e.preventDefault();
        console.log("join group");
    };

    function handleSubmit() {
        return mode === "CREATE"
            ? handleCreateGroup
            : mode === "JOIN"
            ? handleJoinGroup
            : () => console.error(`Le mode ${mode} n'est pas implémenté`);
    }

    return (
        <>
            <UserGroups showModal={handleShowModal} userGroups={userGroups} />
            <InputModal
                show={show}
                close={() => setShow(false)}
                submit={handleSubmit()}
                value={modalValue}
                changeValue={({ target }) => setModalValue(target.value)}
                modal={modal}
            />
        </>
    );
};

export default UserGroupsContainer;
