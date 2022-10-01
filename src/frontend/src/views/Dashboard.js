import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getGroceriesByUser } from "../services/GroceryService";

const Dashboard = (props) => {
    const location = useLocation();
    const [groceries, setGroceries] = useState([]);
    const { name, email } = location.state;

    useEffect(() => {
        getGroceriesByUser(email)
            .then((response) => {
                setGroceries(response.data);
            })
            .catch((err) => console.log(err));
    }, [email]);

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
            <section className="d-flex col-md-7 col-lg-8  bg-white rounded">
                <article id="groceriesList" className="m-3 p-4 h-50">
                    <h1 className="fs-3 text-center">Mes épiceries</h1>
                    <ul>
                        {groceries.map((grocery, i) => (
                            <li key={i}>{grocery.name}</li>
                        ))}
                    </ul>
                </article>
            </section>
        </div>
    );
};

export default Dashboard;
