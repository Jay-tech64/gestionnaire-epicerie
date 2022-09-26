import CreateGrocery from "../components/CreateGrocery";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../api/axios";

const CreateGroceryContainer = () => {
    const [groceryName, setGroceryName] = useState("");
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [articles, setArticles] = useState([]);
    const inputFocus = useRef();
    const location = useLocation();
    const { owner, email } = location.state;
    const [show, setShow] = useState(false);
    const history = useHistory();

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
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
        console.log(JSON.stringify(dto));
        axios
            .post("/groceries", JSON.stringify(dto), {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log(response);
                history.push("/dashboard", response.data);
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
            showModal={() => {
                setShow(true);
            }}
            closeModal={handleClose}
        />
    );
};

export default CreateGroceryContainer;
