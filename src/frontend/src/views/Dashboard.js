import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "../components/Navbar";
import UserGroceries from "../components/UserGroceries";
import UserStats from "../components/UserStats";

const Dashboard = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        history.replace("/");
        createBrowserHistory.replace("/");
    };

    return (
        <div className="divStyles p-3 d-flex justify-content-around">
            <Navbar logout={handleLogout} />
            <section className="d-flex col-md-7 col-lg-8 row rounded">
                <UserGroceries />
                <UserStats />
            </section>
        </div>
    );
};

export default Dashboard;
