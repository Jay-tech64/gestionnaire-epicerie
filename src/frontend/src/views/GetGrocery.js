import { useHistory, useLocation } from "react-router-dom";
import GroceryListComponent from "../containers/GroceryListComponent";
import { updateGrocery } from "../services/GroceryService";

const GetGrocery = () => {
    const location = useLocation();
    const history = useHistory();
    const { state } = location;
    const id = state?.id;
    const name = state?.name;
    const articles = state?.articles;
    const owner = state?.owner;

    const handleComplete = (e, groceryName, groceryArticles, totalPrice) => {
        e.preventDefault();
        const dto = {
            id: id,
            name: groceryName,
            owner: owner,
            articles: groceryArticles,
            totalPrice: totalPrice,
        };
        updateGrocery(dto)
            .then(() => {
                history.push("/dashboard");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <GroceryListComponent
                onComplete={handleComplete}
                groceryId={id}
                groceryName={name}
                groceryArticles={articles}
                isDeletable={true}
            />
        </div>
    );
};

export default GetGrocery;
