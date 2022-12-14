import { useHistory, useLocation } from "react-router-dom";
import { createGrocery } from "../services/GroceryService";
import GroceryListComponent from "../containers/GroceryListComponent";

const CreateGrocery = () => {
    const history = useHistory();
    const location = useLocation();
    const { state } = location;

    const handleComplete = (e, groceryName, articles, totalPrice) => {
        e.preventDefault();
        const dto = {
            name: groceryName,
            owner: { name: state.owner, email: state.email },
            articles: articles,
            totalPrice: totalPrice,
            isCompleted: false,
        };

        createGrocery(dto)
            .then(() => history.push("/dashboard"))
            .catch((err) => console.log(err));
    };

    return (
        <GroceryListComponent onComplete={handleComplete} isDeletable={false} />
    );
};

export default CreateGrocery;
