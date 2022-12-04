import { useHistory } from "react-router-dom";
import useFetchUserGroceries from "../hooks/useFetchUserGroceries";
import list from "../assets/list.png";

const UserGroceries = () => {
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
            },
        });
    };

    return (
        <article id="groceriesList" className="m-3 p-2 h-90 col-sm-5 bg-white">
            <div className="header d-flex justify-content-center align-items-center">
                <h1 className="fs-3">Mes épiceries</h1>
            </div>
            {groceries.filter((entry) => !entry.isCompleted).length === 0 ? (
                <div
                    className={
                        "d-flex flex-column align-items-center justify-content-center h-75"
                    }
                >
                    <img
                        className={"mb-3"}
                        src={list}
                        alt={"Icône d'une liste"}
                    />
                    <p
                        style={{
                            fontFamily: "'Fuzzy Bubbles', cursive",
                            fontSize: "20px",
                        }}
                    >
                        Aucune épicerie pour l'instant
                    </p>
                </div>
            ) : (
                <div className="mx-3">
                    {groceries
                        .filter((entry) => !entry.isCompleted)
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
                                    onClick={() => handleGetGrocery(grocery)}
                                >
                                    Détail
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </article>
    );
};

UserGroceries.propTypes = {};

export default UserGroceries;
