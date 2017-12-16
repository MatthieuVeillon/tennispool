import React, { Component } from "react";
import AdminForm from "./Components/AdminForm";
import AdminUsers from "./Components/AdminUsers";
import Users from "./Components/Users";
import User from "./Components/User";

import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log("cdm");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Users} />
          <Route exact path="/admin" component={AdminForm} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route
            exact
            path="/users/:poolName/:userName"
            render={routeProps => (
              <User
                userName={routeProps.match.params.userName}
                poolName={routeProps.match.params.poolName}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
