import { useLocation } from "react-router-dom";

const GetGrocery = () => {
    const { state } = useLocation();
    const articles = state.articles;

    return (
        <main className="divStyles">
            {console.log(state.articles)}
            {articles.map((article) => (
                <li>{article.name}</li>
            ))}
            <h1>allo</h1>
        </main>
    );
};

export default GetGrocery;
