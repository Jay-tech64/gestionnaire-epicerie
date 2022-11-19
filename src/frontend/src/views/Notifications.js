import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import vacation from "../assets/vacation.png";

const Notifications = () => {
    const history = useHistory();

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={() => history.goBack()}
                        style={{ position: "absolute" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />{" "}
                        Dashboard
                    </button>
                    <h1 className="text-center">Notifications</h1>
                </div>

                <div
                    className={
                        "d-flex flex-column align-items-center justify-content-center h-100"
                    }
                >
                    <img
                        className={"mb-3"}
                        src={vacation}
                        alt={"Icône d'une famille"}
                    />
                    <p
                        style={{
                            fontFamily: "'Fuzzy Bubbles', cursive",
                            fontSize: "20px",
                        }}
                    >
                        Aucune notification pour le moment
                    </p>
                </div>
            </div>
        </main>
    );
};

Notifications.propTypes = {};

export default Notifications;
