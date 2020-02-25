import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { FriendsList } from "./components/FriendsList";

function App() {
  
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <h1>BESTEES!!</h1>
        <nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/protected">Protected Page</Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </nav>
        <Switch>
          <PrivateRoute path="/protected" component={FriendsList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;