import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import useFetchUserGroceries from "../hooks/useFetchUserGroceries";

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
                <section className="d-flex col justify-content-center rounded">
                    <article
                        id="groceriesList"
                        className="m-3 p-2 h-90 col bg-white"
                    >
                        <ul className="mx-3">
                            {groceries
                                .filter((entry) => entry.isCompleted)
                                .map((grocery, i) => (
                                    <li
                                        key={i}
                                        className="row"
                                        onClick={() =>
                                            handleGetGrocery(grocery)
                                        }
                                    >
                                        <p className="col-sm-8">
                                            {grocery.name}
                                        </p>
                                        <p className="col-sm-4 text-end">
                                            {grocery.totalPrice.toFixed(2)} $
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default GroceriesHistory;
