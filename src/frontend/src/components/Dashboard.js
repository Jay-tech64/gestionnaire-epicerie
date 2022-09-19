import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const location = useLocation();
  return (
    <div className="divStyles p-3">
      <nav className="col-md-4 col-lg-3 h-100 p-2 bg-white text-center rounded" style={{minHeight: "95vh"}} >
        <div className="header">
          <h1>Gestionnaire d'épicerie</h1>
          <p className="fs-3">Bonjour {location.state.email}</p>
        </div>
        <div className="links">
          <Link to="/create-grocery">Nouvelle épicerie</Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
