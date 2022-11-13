import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory, useLocation } from "react-router-dom";

const GroupDetails = () => {
    const history = useHistory();
    const location = useLocation();
    const { state } = location;
    const groupName = state?.name;
    const members = state?.members;
    const owner = state?.owner;

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <header
                    className={
                        "d-flex justify-content-between align-items-center mb-4"
                    }
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => history.goBack()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />{" "}
                        Mes groupes
                    </button>
                    <h1 className="text-center d-inline">{groupName}</h1>

                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-button-dark-example1"
                            variant="secondary"
                        >
                            Options
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item
                                onClick={() => console.log("Ajouter un membre")}
                            >
                                <FontAwesomeIcon
                                    icon={faUserPlus}
                                    className={"me-2"}
                                />
                                Ajouter un membre
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </header>
                <section>
                    <h2>Membres</h2>
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className={
                                "d-flex justify-content-between align-items-center rounded py-2 px-3"
                            }
                            style={{ border: "1px solid black" }}
                        >
                            <div>
                                <p className={"fs-4 m-0"}>{member.name}</p>
                                <p className={"m-0"}>{member.email}</p>
                            </div>
                            {owner.email === member.email && (
                                <p className={"m-0"}>Admin</p>
                            )}
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default GroupDetails;
