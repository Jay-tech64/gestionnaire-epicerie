import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGroceriesByUser } from "../services/GroceryService";
import { createBrowserHistory } from "history";
import {
    faShoppingBasket,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
    const [groceries, setGroceries] = useState([]);
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const history = useHistory();

    useEffect(() => {
        if (!email) {
            history.replace("/");
            return;
        }
        getGroceriesByUser(email)
            .then((response) => {
                setGroceries(response.data);
            })
            .catch((err) => console.log(err));
    }, [email, history]);

    const handleGetGrocery = (grocery) => {
        history.push({
            pathname: "/get-grocery",
            state: {
                id: grocery.id,
                name: grocery.name,
                owner: { name: name, email: email },
                articles: grocery.articles,
            },
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        history.replace("/");
        createBrowserHistory.replace("/");
    };

    return (
        <div className="divStyles p-3 d-flex justify-content-around">
            <nav
                className="d-flex flex-column col-md-4 col-lg-3 p-2 bg-white text-center rounded"
                style={{ minHeight: "95vh" }}
            >
                <div className="header">
                    <h1>Gestionnaire d'épicerie</h1>
                    <p className="fs-3">Bonjour, {name}</p>
                </div>
                <div className="links">
                    <Link
                        to={{
                            pathname: "/create-grocery",
                            state: { owner: name, email: email },
                        }}
                        className="btn btn-primary"
                    >
                        <FontAwesomeIcon
                            icon={faShoppingBasket}
                            className={"me-2"}
                        />
                        Nouvelle épicerie
                    </Link>
                </div>
                <button
                    className="btn btn-danger mt-auto"
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className={"me-2"}
                    />
                    Déconnexion
                </button>
            </nav>
            <section className="d-flex col-md-7 col-lg-8  row rounded">
                <article
                    id="groceriesList"
                    className="m-3 p-2 h-90 col-sm-5 bg-white"
                >
                    <div className="header d-flex justify-content-center align-items-center">
                        <h1 className="fs-3">Mes épiceries</h1>
                    </div>
                    <ul className="mx-3">
                        {groceries
                            .filter((entry) => !entry.isCompleted)
                            .map((grocery, i) => (
                                <li
                                    key={i}
                                    className="row"
                                    onClick={() => handleGetGrocery(grocery)}
                                >
                                    <p className="col-sm-8">{grocery.name}</p>
                                    <p className="col-sm-4 text-end">
                                        {grocery.totalPrice.toFixed(2)} $
                                    </p>
                                </li>
                            ))}
                    </ul>
                </article>
            </section>
        </div>
    );
};

export default Dashboard;
