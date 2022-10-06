import React from "react";
import { useLocation } from "react-router-dom";
import GroceryListComponent from "../containers/GroceryListComponent";

const GetGrocery = () => {
    const location = useLocation();
    const { state } = location;
    const id = state?.id;
    const name = state?.name;
    const articles = state?.articles;

    const handleComplete = (e, groceryName, groceryArticles, totalPrice) => {
        e.preventDefault();
        console.log(id, name, articles);
    };

    return (
        <div>
            <GroceryListComponent
                onComplete={handleComplete}
                groceryId={id}
                groceryName={name}
                groceryArticles={articles}
            />
        </div>
    );
};

export default GetGrocery;
