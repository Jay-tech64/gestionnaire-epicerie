import { useEffect, useRef, useState } from "react";
import GroceryList from "../components/GroceryList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GroceryListComponent = ({
    onComplete,
    groceryId,
    groceryName,
    groceryArticles,
}) => {
    const [name, setName] = useState(groceryName);
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [articles, setArticles] = useState(
        typeof groceryArticles === "undefined" ? [] : groceryArticles
    );
    const [errorMessage, setErrorMessage] = useState("");
    const inputFocus = useRef();
    const [show, setShow] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let totalPrice = 0.0;
        articles.forEach((article) => {
            totalPrice += parseFloat(article.price);
        });
        setTotalPrice(totalPrice.toFixed(2));
    }, [articles]);

    const handleShowModal = () => {
        if (articles.length === 0) {
            setErrorMessage("L'épicerie doit contenir au moins un article.");
            return;
        }
        setShow(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setArticles([...articles, { name: item, price: price }]);
        setItem("");
        setPrice("");
        inputFocus.current.focus();
    };

    const handleDelete = (itemName) => {
        setArticles(articles.filter((article) => article.name !== itemName));
    };

    return (
        <GroceryList
            onSubmit={handleSubmit}
            groceryName={name}
            setGroceryName={({ target }) => setName(target.value)}
            item={item}
            setItem={({ target }) => setItem(target.value)}
            inputFocus={inputFocus}
            price={price}
            setPrice={({ target }) => setPrice(target.value)}
            articles={articles}
            onDelete={handleDelete}
            totalPrice={totalPrice}
            onComplete={onComplete}
            show={show}
            showModal={handleShowModal}
            closeModal={() => setShow(false)}
            errorMessage={errorMessage}
            navigateDashboard={() => history.goBack()}
        />
    );
};

GroceryListComponent.prototype = {
    onComplete: PropTypes.func.isRequired,
    groceryId: PropTypes.number,
    groceryName: PropTypes.string,
    groceryArticles: PropTypes.array,
};

export default GroceryListComponent;
