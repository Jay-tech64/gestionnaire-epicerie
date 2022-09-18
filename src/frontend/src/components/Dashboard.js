import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const location = useLocation();
  return (
    <div className="text-center">
      <h1>User dashboard</h1>
      <p>Hello {location.state.email}</p>
    </div>
  );
};

export default Dashboard;
