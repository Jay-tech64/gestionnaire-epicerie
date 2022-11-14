import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import NotFound from "./components/NotFound";
import CreateGrocery from "./views/CreateGrocery";
import GetGrocery from "./views/GetGrocery";
import GroceriesHistory from "./views/GroceriesHistory";
import UserGroupsContainer from "./containers/UserGroupsContainer";
import GroupDetailsContainer from "./containers/GroupDetailsContainer";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/create-grocery">
                        <CreateGrocery />
                    </Route>
                    <Route path="/get-grocery">
                        <GetGrocery />
                    </Route>
                    <Route path="/history">
                        <GroceriesHistory />
                    </Route>
                    <Route path="/groups">
                        <UserGroupsContainer />
                    </Route>
                    <Route path="/group-details">
                        <GroupDetailsContainer />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
