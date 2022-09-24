import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Article from "./Article";

const CreateGrocery = () => {
    const [item, setItem] = useState("");
    const [articles, setArticles] = useState([
        "Article 1",
        "Article 2",
        "Article 3",
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticles([...articles, item]);
        setItem("");
    };

    const handleDelete = (itemName) => {
        setArticles(articles.filter((article) => article !== itemName));
    };

    return (
        <div className="divStyles d-flex justify-content-center p-3">
            <main className="col-sm-10 p-4 bg-white rounded">
                <h1 className="text-center">Nouvelle épicerie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex my-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ajouter un élément à votre épicerie"
                            value={item}
                            onChange={({ target }) => setItem(target.value)}
                        />
                        <button className="btn btn-info mx-2">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
                <section className="articleList">
                    <ul>
                        {articles.map((article, i) => (
                            <Article
                                className="my-2"
                                key={i}
                                value={article}
                                delete={handleDelete}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default CreateGrocery;
