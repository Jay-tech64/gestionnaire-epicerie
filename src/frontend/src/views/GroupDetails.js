import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";

const GroupDetails = () => {
    const history = useHistory();

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <div
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
                    <h1 className="text-center d-inline">Détails du groupe</h1>

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
                                Rejoindre un groupe
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </main>
    );
};

export default GroupDetails;
