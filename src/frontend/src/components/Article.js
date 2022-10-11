import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article = ({ value, price, deleteArticle, doCapitalize, onClick }) => {
    const capitalize = (string) =>
        string[0].toUpperCase() + string.toLowerCase().slice(1);

    return (
        <div
            className="d-flex justify-content-between align-items-center form-control my-2"
            onClick={onClick}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    {doCapitalize ? capitalize(value) : value}
                </div>
                <span className="badge bg-primary rounded-pill">{price} $</span>
            </div>
            <button
                className="btn btn-danger mx-2"
                onClick={() => deleteArticle(value)}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default Article;
