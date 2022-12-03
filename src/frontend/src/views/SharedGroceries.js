import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getGroceriesByUser } from "../services/GroceryService";
import { useHistory } from "react-router-dom";

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
                    <h2>En cours</h2>
                    {groceries
                        .filter((entry) => !entry.isCompleted)
                        .map((grocery, index) => (
                            <div
                                key={index}
                                className={
                                    "d-flex justify-content-between align-items-center rounded py-2 px-3 mb-2"
                                }
                                style={{ border: "1px solid black" }}
                                onClick={() => handleGetGrocery(grocery)}
                            >
                                <p className="col-sm-8">{grocery.name}</p>
                                <p className="col-sm-4 text-end">
                                    {grocery.totalPrice.toFixed(2)} $
                                </p>
                            </div>
                        ))}
                </section>
                <section>
                    <h2>Complétées</h2>
                    {groceries
                        .filter((entry) => entry.isCompleted)
                        .map((grocery, index) => (
                            <div
                                key={index}
                                className={
                                    "d-flex justify-content-between align-items-center rounded py-2 px-3 mb-2"
                                }
                                style={{ border: "1px solid black" }}
                                onClick={() => handleGetGrocery(grocery)}
                            >
                                <p className="col-sm-8">{grocery.name}</p>
                                <p className="col-sm-4 text-end">
                                    {grocery.totalPrice.toFixed(2)} $
                                </p>
                            </div>
                        ))}
                </section>
            </div>
        </main>
    );
};

SharedGroceries.propTypes = {
    user: PropTypes.object.isRequired,
};

export default SharedGroceries;
