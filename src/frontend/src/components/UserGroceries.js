import {useHistory} from "react-router-dom";
import useFetchUserGroceries from "../hooks/useFetchUserGroceries";

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
    );
};

UserGroceries.propTypes = {

};

export default UserGroceries;