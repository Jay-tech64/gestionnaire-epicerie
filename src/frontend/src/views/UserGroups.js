import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowsDownToPeople,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import family from "../assets/family.png";
import { Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import GroupCard from "../components/GroupCard";

const UserGroups = ({
    show,
    closeModal,
    showModal,
    groupName,
    changeGroupName,
    createGroup,
    userGroups,
}) => {
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
                {userGroups.length === 0 ? (
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
                        <button
                            className={"btn btn-primary"}
                            onClick={showModal}
                        >
                            Créer un groupe
                        </button>
                    </div>
                ) : (
                    <div>
                        {userGroups.map((group, index) => (
                            <GroupCard key={index} groupInfo={group} />
                        ))}
                    </div>
                )}
            </div>

            <Modal show={show} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Titre du groupe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>
                                Entrez le nom du groupe à créer
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ex. Les chasseurs de rabais"
                                value={groupName}
                                onChange={changeGroupName}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={createGroup}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

UserGroups.propTypes = {
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    changeGroupName: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired,
    userGroups: PropTypes.array.isRequired,
};

export default UserGroups;
