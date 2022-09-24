import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Article from "./Article";

const CreateGrocery = () => {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [articles, setArticles] = useState([
        ["Article 1", 1.99],
        ["Article 2", 2.99],
        ["Article 3", 3.99],
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticles([...articles, [item, price]]);
        setItem("");
        setPrice("");
    };

    const handleDelete = (itemName) => {
        setArticles(articles.filter((article) => article[0] !== itemName));
    };

    return (
        <div className="divStyles d-flex justify-content-center p-3">
            <main className="col-sm-10 p-4 bg-white rounded">
                <h1 className="text-center">Nouvelle épicerie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex my-4">
                        <input
                            type="text"
                            className="flex-grow-1 rounded"
                            placeholder="Ajouter un élément à votre épicerie"
                            value={item}
                            onChange={({ target }) => setItem(target.value)}
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
            </main>
        </div>
    );
};

export default CreateGrocery;
