import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article = (props) => {
    const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

    return (
        <div className="d-flex justify-content-between align-items-center form-control my-2">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{capitalize(props.value)}</div>
                <span className="badge bg-primary rounded-pill">
                    {props.price} $
                </span>
            </div>
            <button
                className="btn btn-danger mx-2"
                onClick={() => props.delete(props.value)}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default Article;
