import Weather from "./component/Weather";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Dashboard from "./component/Dashboard";
function App() {
  return (
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
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
