import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faClockRotateLeft,
    faShoppingBasket,
    faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ logout }) => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    return (
        <nav
            className="d-flex flex-column col-md-4 col-lg-3 p-2 bg-white text-center rounded"
            style={{ minHeight: "95vh" }}
        >
            <div className="header">
                <h1>Gestionnaire d'épicerie</h1>
                <p className="fs-3">Bonjour, {name}</p>
            </div>
            <div className="links d-flex flex-column">
                <Link
                    to={{
                        pathname: "/create-grocery",
                        state: { owner: name, email: email },
                    }}
                    className="btn btn-primary mb-2"
                >
                    <FontAwesomeIcon
                        icon={faShoppingBasket}
                        className={"me-2"}
                    />
                    Nouvelle épicerie
                </Link>
                <Link
                    to={{
                        pathname: "/history",
                    }}
                    className="btn btn-primary mb-2"
                >
                    <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        className={"me-2"}
                    />
                    Historique
                </Link>
                <Link
                    to={{
                        pathname: "/groups",
                    }}
                    className="btn btn-primary mb-2"
                >
                    <FontAwesomeIcon icon={faPeopleGroup} className={"me-2"} />
                    Mes groupes
                </Link>
            </div>
            <button className="btn btn-danger mt-auto" onClick={logout}>
                <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className={"me-2"}
                />
                Déconnexion
            </button>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default Navbar;
