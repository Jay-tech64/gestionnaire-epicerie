import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const location = useLocation();
    const { name, email } = location.state;
    return (
        <div className="divStyles p-3">
            <nav
                className="col-md-4 col-lg-3 p-2 bg-white text-center rounded"
                style={{ minHeight: "95vh" }}
            >
                <div className="header">
                    <h1>Gestionnaire d'épicerie</h1>
                    <p className="fs-3">Bonjour, {name}</p>
                </div>
                <div className="links">
                    <Link
                        to={{
                            pathname: "/create-grocery",
                            state: { owner: name, email: email },
                        }}
                    >
                        Nouvelle épicerie
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;
