import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faUserPlus,
    faCrown,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import * as React from "react";
import { Tooltip } from "@mui/material";

const GroupDetails = ({
    show,
    closeModal,
    showModal,
    groupName,
    members,
    owner,
    addUser,
    userToAdd,
    changeUserToAdd,
    errorMessage,
}) => {
    const history = useHistory();

    function isOwner(member) {
        return owner.email === member?.owner?.email;
    }

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
                            <Dropdown.Item onClick={showModal}>
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
                                "d-flex justify-content-between align-items-center rounded py-2 px-3 mb-2"
                            }
                            style={{ border: "1px solid black" }}
                        >
                            <div>
                                <div className={"d-flex align-items-center"}>
                                    <p className={"fs-4 m-0 me-2"}>
                                        {member?.owner?.name}
                                    </p>
                                    {isOwner(member) && (
                                        <Tooltip
                                            title={"Propriétaire du groupe"}
                                            arrow
                                            placement={"top"}
                                        >
                                            <FontAwesomeIcon icon={faCrown} />
                                        </Tooltip>
                                    )}
                                </div>
                                <p className={"m-0"}>{member?.owner?.email}</p>
                            </div>
                            {member?.isActive && (
                                <Link
                                    to={{
                                        pathname: "/shared-groceries",
                                        state: {
                                            user: member?.owner,
                                        },
                                    }}
                                    className={"btn btn-primary"}
                                >
                                    Voir épiceries
                                </Link>
                            )}
                            {!isOwner(member) && !member?.isActive && (
                                <p className={"m-0"}>
                                    En attente d'approbation
                                </p>
                            )}
                        </div>
                    ))}
                </section>
            </div>
            <Modal show={show} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajout d'un membre au groupe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addUser}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>
                                Entrez l'email de la personne à ajouter
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ex. exemple@gmail.com"
                                value={userToAdd}
                                onChange={changeUserToAdd}
                                autoFocus
                            />
                            {errorMessage && (
                                <p
                                    className="m-2 text-danger fw-bold p-1 rounded"
                                    style={{
                                        backgroundColor: "rgb(240, 128, 128)",
                                    }}
                                >
                                    {errorMessage}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group
                            className={"d-flex justify-content-end pt-3"}
                        >
                            <Button
                                variant="secondary"
                                onClick={closeModal}
                                className={"me-2"}
                            >
                                Annuler
                            </Button>
                            <Button variant="primary" type={"submit"}>
                                Ajouter
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </main>
    );
};

GroupDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    owner: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired,
    userToAdd: PropTypes.string.isRequired,
    changeUserToAdd: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default GroupDetails;
