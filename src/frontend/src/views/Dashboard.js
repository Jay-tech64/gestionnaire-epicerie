import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGroceriesByUser } from "../services/GroceryService";

const Dashboard = () => {
    const [groceries, setGroceries] = useState([]);
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const history = useHistory();

    useEffect(() => {
        getGroceriesByUser(email)
            .then((response) => {
                setGroceries(response.data);
            })
            .catch((err) => console.log(err));
    }, [email]);

    const handleGetGrocery = (grocery) => {
        console.log(grocery);
        history.push({
            pathname: "/get-grocery",
            state: { articles: grocery.articles },
        });
    };

    return (
        <div className="divStyles p-3 d-flex justify-content-around">
            <nav
                className="col-md-4 col-lg-3 p-2 bg-white text-center rounded"
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
                    >
                        Nouvelle épicerie
                    </Link>
                </div>
            </nav>
            <section className="d-flex col-md-7 col-lg-8  row rounded">
                <article
                    id="groceriesList"
                    className="m-3 p-2 h-50 col-sm-5 bg-white"
                >
                    <div className="header d-flex justify-content-center align-items-center">
                        <h1 className="fs-3">Mes épiceries</h1>
                    </div>
                    <ul className="mx-3">
                        {groceries.map((grocery, i) => (
                            <li
                                key={i}
                                className="row"
                                onClick={() => handleGetGrocery(grocery)}
                            >
                                <p className="col-sm-9">{grocery.name}</p>
                                <p className="col-sm-3">
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
