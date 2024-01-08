import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/transactions" component={Transactions}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/not-found" component={NotFound}/>
      <Redirect to="/not-found"/>
    </Switch>
  );
}

export default App;
