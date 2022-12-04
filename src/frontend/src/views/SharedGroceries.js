import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getGroceriesByUser } from "../services/GroceryService";
import { useHistory } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SharedGroceries = ({ user }) => {
    const [groceries, setGroceries] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getGroceriesByUser(user?.email)
            .then((response) => {
                setGroceries(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleGetGrocery = (grocery) => {
        history.push({
            pathname: "/get-grocery",
            state: {
                id: grocery.id,
                name: grocery.name,
                owner: { name: user?.name, email: user?.email },
                articles: grocery.articles,
                isCompleted: true,
            },
        });
    };

    function isInProgressListEmpty() {
        return groceries.filter((entry) => !entry.isCompleted).length === 0;
    }

    function isCompletedListEmpty() {
        return groceries.filter((entry) => entry.isCompleted).length === 0;
    }

    return (
        <main className={"divStyles d-flex justify-content-center p-3"}>
            <div
                className={"d-flex flex-column col-sm-10 p-4 bg-white rounded"}
            >
                <header className={"mb-4"}>
                    <button
                        className="btn btn-primary"
                        onClick={() => history.goBack()}
                        style={{ position: "absolute" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />{" "}
                        Retour
                    </button>
                    <h1 className="text-center">Épiceries de {user?.name}</h1>
                </header>
                <section className={"mb-4"}>
                    <Tabs>
                        <TabList>
                            <Tab>En cours</Tab>
                            <Tab>Complétées</Tab>
                        </TabList>

                        <TabPanel>
                            <>
                                {isInProgressListEmpty() ? (
                                    <p
                                        style={{
                                            fontFamily:
                                                "'Fuzzy Bubbles', cursive",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Aucune épicerie pour l'instant
                                    </p>
                                ) : (
                                    groceries
                                        .filter((entry) => !entry.isCompleted)
                                        .map((grocery, index) => (
                                            <div
                                                className="d-flex justify-content-between align-items-center form-control my-2"
                                                key={index}
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">
                                                        {grocery.name}
                                                    </div>
                                                    <span className="badge bg-primary rounded-pill">
                                                        {grocery.totalPrice.toFixed(
                                                            2
                                                        )}{" "}
                                                        $
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        handleGetGrocery(
                                                            grocery
                                                        )
                                                    }
                                                >
                                                    Détail
                                                </button>
                                            </div>
                                        ))
                                )}
                            </>
                        </TabPanel>
                        <TabPanel>
                            <>
                                {isCompletedListEmpty() ? (
                                    <p
                                        style={{
                                            fontFamily:
                                                "'Fuzzy Bubbles', cursive",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Aucune épicerie pour l'instant
                                    </p>
                                ) : (
                                    groceries
                                        .filter((entry) => entry.isCompleted)
                                        .map((grocery, index) => (
                                            <div
                                                className="d-flex justify-content-between align-items-center form-control my-2"
                                                key={index}
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">
                                                        {grocery.name}
                                                    </div>
                                                    <span className="badge bg-primary rounded-pill">
                                                        {grocery.totalPrice.toFixed(
                                                            2
                                                        )}{" "}
                                                        $
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        handleGetGrocery(
                                                            grocery
                                                        )
                                                    }
                                                >
                                                    Détail
                                                </button>
                                            </div>
                                        ))
                                )}
                            </>
                        </TabPanel>
                    </Tabs>
                </section>
            </div>
        </main>
    );
};

SharedGroceries.propTypes = {
    user: PropTypes.object.isRequired,
};

export default SharedGroceries;
