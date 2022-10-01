import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import NotFound from "./components/NotFound";
import CreateGroceryContainer from "./containers/CreateGroceryContainer";

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
                        <CreateGroceryContainer />
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
