import CreateGrocery from "../views/CreateGrocery";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { createGrocery } from "../services/GroceryService";

const CreateGroceryContainer = () => {
    const [groceryName, setGroceryName] = useState("");
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const inputFocus = useRef();
    const location = useLocation();
    const { owner, email } = location.state;
    const [show, setShow] = useState(false);
    const history = useHistory();

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

    const handleComplete = (e) => {
        e.preventDefault();
        const dto = {
            name: groceryName,
            owner: { name: owner, email: email },
            articles: articles,
            totalPrice: totalPrice,
        };

        createGrocery(dto)
            .then((response) => {
                console.log(response);
                history.push("/dashboard");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        var totalPrice = 0.0;
        articles.forEach((article) => {
            totalPrice += parseFloat(article.price);
        });
        setTotalPrice(totalPrice.toFixed(2));
    }, [articles]);

    return (
        <CreateGrocery
            onSubmit={handleSubmit}
            groceryName={groceryName}
            setGroceryName={({ target }) => setGroceryName(target.value)}
            item={item}
            setItem={({ target }) => setItem(target.value)}
            inputFocus={inputFocus}
            price={price}
            setPrice={({ target }) => setPrice(target.value)}
            articles={articles}
            onDelete={handleDelete}
            totalPrice={totalPrice}
            onComplete={handleComplete}
            show={show}
            showModal={handleShowModal}
            closeModal={() => setShow(false)}
            errorMessage={errorMessage}
        />
    );
};

export default CreateGroceryContainer;
