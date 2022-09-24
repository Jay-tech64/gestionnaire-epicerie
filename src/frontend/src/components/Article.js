import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article = (props) => {
    return (
        <div className="d-flex">
            <input
                type="text"
                className="form-control"
                value={props.value}
                readOnly
            />
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
