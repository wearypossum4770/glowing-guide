import Weather from "./component/Weather";
import { useState } from "react";
import Home from "./component/Home";
import Dashboard from "./component/Dashboard";
import About from "./component/About";
import { UserDetail, Login } from "./component/UserDetail";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function App() {
  let currentUser = {};
  const [user, setUser] = useState(currentUser);

  return (
    <div className="App">
      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/weather">Weather</Link>
              </li>
            </ul>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/weather" component={Weather} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}
