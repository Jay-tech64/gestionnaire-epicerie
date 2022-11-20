import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import vacation from "../assets/vacation.png";

const Notifications = () => {
    const history = useHistory();
    const location = useLocation();
    const { state } = location;
    const notifications = state?.notifications;

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <div className={"mb-4"}>
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

                {notifications.length === 0 ? (
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
                ) : (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={
                                "d-flex justify-content-between align-items-center rounded py-2 px-3 mb-2"
                            }
                            style={{ border: "1px solid black" }}
                        >
                            <p className={"m-0"}>{notification.message}</p>
                            <div>
                                <button className={"btn btn-primary me-2"}>
                                    Accepter
                                </button>
                                <button className={"btn btn-danger"}>
                                    Refuser
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Notifications;
