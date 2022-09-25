import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Article from "./Article";

const CreateGrocery = () => {
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
        <div className="divStyles d-flex justify-content-center p-3">
            <main className="d-flex flex-column col-sm-10 p-4 bg-white rounded">
                <h1 className="text-center">Nouvelle épicerie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex my-4">
                        <input
                            type="text"
                            className="flex-grow-1 rounded"
                            placeholder="Ajouter un élément à votre épicerie"
                            value={item}
                            onChange={({ target }) => setItem(target.value)}
                            ref={inputFocus}
                            autoFocus
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            className="rounded mx-1"
                            placeholder="Prix"
                            value={price}
                            onChange={({ target }) => setPrice(target.value)}
                            required
                        />
                        <button className="btn btn-info mx-2">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
                <section className="articleList">
                    {articles.map((article, i) => (
                        <Article
                            className="my-2"
                            key={i}
                            value={article[0]}
                            price={article[1]}
                            delete={handleDelete}
                        />
                    ))}
                </section>
                <section className="d-flex align-items-bottom mt-auto">
                    <h1 className="m-0">Prix total :</h1>
                    <p className="fs-2 mx-2 my-0">{totalPrice} $</p>
                    <button className="btn btn-success ms-auto">
                        Terminer
                    </button>
                </section>
            </main>
        </div>
    );
};

export default CreateGrocery;
