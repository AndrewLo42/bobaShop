import React, { Component } from "react";
// import "./App.css";
import { Header } from "./header/header.js";
import { Switch, Route } from "react-router-dom";

import PlaceOrder from "./pages/PlaceOrder";
import UpdatePredicted from "./pages/UpdatePredicted";
import Kitchen from "./pages/Kitchen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={PlaceOrder} />
          <Route path="/manage" component={UpdatePredicted} />
          <Route path="/kitchen" component={Kitchen} />
        </Switch>
      </div>
    );
  }
}

export default App;
