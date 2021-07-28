import Weather from "./component/Weather";
import Home from "./component/Home";
import Dashboard from "./component/Dashboard";
import About from "./component/About";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
export default function App() {
  // prevProps if (props.location !== prevProps.location){onRouteChanged()}
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link onClick={() => console.log("HEY")} to="/">
              Home
            </Link>
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
  );
}
