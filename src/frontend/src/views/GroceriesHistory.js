import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import useFetchUserGroceries from "../hooks/useFetchUserGroceries";
import React from "react";
import loupe from "../assets/loupe.png";

const GroceriesHistory = () => {
    const { groceries } = useFetchUserGroceries();
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    const history = useHistory();

    const handleGetGrocery = (grocery) => {
        history.push({
            pathname: "/get-grocery",
            state: {
                id: grocery.id,
                name: grocery.name,
                owner: { name: name, email: email },
                articles: grocery.articles,
                isCompleted: true,
            },
        });
    };

    function isCompletedListEmpty() {
        return groceries.filter((entry) => entry.isCompleted).length === 0;
    }

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
                    <h1 className="text-center">Historique</h1>
                </div>
                <section className={"flex-fill"}>
                    {isCompletedListEmpty() ? (
                        <div
                            className={
                                "d-flex flex-column align-items-center justify-content-center h-100"
                            }
                        >
                            <img
                                className={"mb-3"}
                                src={loupe}
                                alt={"Icône d'une famille"}
                            />
                            <p
                                style={{
                                    fontFamily: "'Fuzzy Bubbles', cursive",
                                    fontSize: "20px",
                                }}
                            >
                                Aucune historique pour le moment
                            </p>
                        </div>
                    ) : (
                        groceries
                            .filter((entry) => entry.isCompleted)
                            .map((grocery, i) => (
                                <div
                                    className="d-flex justify-content-between align-items-center form-control my-2"
                                    key={i}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                            {grocery.name}
                                        </div>
                                        <span className="badge bg-primary rounded-pill">
                                            {grocery.totalPrice.toFixed(2)} $
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleGetGrocery(grocery)
                                        }
                                    >
                                        Détail
                                    </button>
                                </div>
                            ))
                    )}
                </section>
            </div>
        </main>
    );
};

export default GroceriesHistory;
