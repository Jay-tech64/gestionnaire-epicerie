import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowsDownToPeople,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import family from "../assets/family.png";

const UserGroups = () => {
    const history = useHistory();

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <div
                    className={
                        "d-flex justify-content-between align-items-center"
                    }
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => history.goBack()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />{" "}
                        Dashboard
                    </button>
                    <h1 className="text-center d-inline">Mes groupes</h1>

                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-button-dark-example1"
                            variant="secondary"
                        >
                            Options
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item
                                onClick={() => console.log("Partager")}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowsDownToPeople}
                                    className={"me-2"}
                                />
                                Rejoindre un groupe
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div
                    className={
                        "d-flex flex-column align-items-center justify-content-center h-100"
                    }
                >
                    <img
                        className={"mb-3"}
                        src={family}
                        alt={"Icône d'une famille"}
                    />
                    <p
                        style={{
                            fontFamily: "'Fuzzy Bubbles', cursive",
                            fontSize: "20px",
                        }}
                    >
                        Vous n'avez aucun groupe pour l'instant
                    </p>
                    <button className={"btn btn-primary"}>
                        Créer un groupe
                    </button>
                </div>
            </div>
        </main>
    );
};

export default UserGroups;
