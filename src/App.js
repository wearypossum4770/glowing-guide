import Weather from "./component/Weather";
import { useState, useEffect } from "react";
import Home from "./component/Home";
import Dashboard from "./component/Dashboard";
import About from "./component/About";
import { UserDetail, Login } from "./component/UserDetail";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function App() {
  let currentUser = {
    password:
      "pbkdf2_sha256$260000$Ck8YlACPR1dREAgZDyKSpS$wJbgzljeV0/rgIjPQ6ok/lAJJrvwEI73pRO5vsSyaSo=",
    last_login: null,
    is_superuser: false,
    username: "george.washington",
    email: "george.washington@us.presidents.com",
    is_staff: true,
    is_active: true,
    date_joined: "2021-05-30T12:34:34.709Z",
    madien_name: null,
    nickname: null,
    first_name: "George",
    last_name: "Washington",
    middle_name: "",
    title: null,
    honorific_prefix: "",
    honorific_suffix: "",
    suffix: "",
    date_of_birth: null,
    is_patient: false,
    is_clinic_staff: false,
    date_of_death: null,
    retention_only: false,
    do_not_contact: false,
    owasp_safe_password: false,
    prompt_password_change: false,
  };
  const [user, setUser] = useState(currentUser);
  let post = {
    title: "initial title",
    content:
      "Thank you testuser2 for using our service. This is a test blog post. If you are seeing this please send a help desk ticket",
    date_posted: "2021-03-25T00:19:58.413Z",
    date_modified: "2021-03-25T00:19:58.413Z",
    author: 1,
  };
  useEffect(() => {
    async function fetchData({ url = "", options = {}, data = {} }) {
      try {
        let opts = {
          ...options,
          method: "POST",
          mode: "cors",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        console.log(JSON.stringify(data));
        const resp = await fetch(url, opts);

        if (resp.ok) {
          const response = await resp.json();
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData({ url: "http://localhost:3003/blog/add", data: post });
  }, []);
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
