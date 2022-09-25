import CreateGrocery from "../components/CreateGrocery";
import { useEffect, useRef } from "react";
import { useState } from "react";

const CreateGroceryContainer = () => {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [articles, setArticles] = useState([]);
    const inputFocus = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticles([...articles, [item, price]]);
        setItem("");
        setPrice("");
        inputFocus.current.focus();
    };

    const handleDelete = (itemName) => {
        setArticles(articles.filter((article) => article[0] !== itemName));
    };

    useEffect(() => {
        var totalPrice = 0.0;
        articles.forEach((article) => {
            totalPrice += parseFloat(article[1]);
        });
        setTotalPrice(totalPrice.toFixed(2));
    }, [articles]);

    return (
        <CreateGrocery
            onSubmit={handleSubmit}
            item={item}
            setItem={({ target }) => setItem(target.value)}
            inputFocus={inputFocus}
            price={price}
            setPrice={({ target }) => setPrice(target.value)}
            articles={articles}
            onDelete={handleDelete}
            totalPrice={totalPrice}
        />
    );
};

export default CreateGroceryContainer;
