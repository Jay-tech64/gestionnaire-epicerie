import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "../components/Navbar";
import UserGroceries from "../components/UserGroceries";
import UserStats from "../components/UserStats";
import { useEffect, useState } from "react";
import { getNotificationByUser } from "../services/NotificationService";

const Dashboard = () => {
    const userEmail = localStorage.getItem("userEmail");
    const history = useHistory();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotificationByUser(userEmail)
            .then((response) => {
                console.log(response.data);
                setNotifications(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        history.replace("/");
        createBrowserHistory.replace("/");
    };

    return (
        <div className="divStyles p-3 d-flex justify-content-around">
            <Navbar logout={handleLogout} notifications={notifications} />
            <section className="d-flex col-md-7 col-lg-8 row rounded">
                <UserGroceries />
                <UserStats />
            </section>
        </div>
    );
};

export default Dashboard;
