import { Switch, Route, Redirect } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/transactions" component={Transactions} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/" component={NotFound}>
        <Redirect to="/dashboard" />
      </Route>
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
