import React from "react";
import PropTypes from "prop-types";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const InputModal = ({ show, close, value, changeValue, submit, modal }) => {
    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>{modal.label}</Form.Label>
                        <Form.Control
                            type={modal.type}
                            placeholder={modal.placeholder}
                            value={value}
                            onChange={changeValue}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className={"d-flex justify-content-end pt-3"}>
                        <Button
                            variant="secondary"
                            onClick={close}
                            className={"me-2"}
                        >
                            Annuler
                        </Button>
                        <Button variant="primary" type="submit">
                            Sauvegarder
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

InputModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    submit: PropTypes.func,
    modal: PropTypes.object.isRequired,
};

export default InputModal;
