import React, { Component } from "react";
import Home from "./containers/Home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
