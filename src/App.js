import React, { Component } from "react";
// import "./App.css";
import { Header } from "./header/header.js";
import { Switch, Route } from "react-router-dom";

import PlaceOrder from "./pages/PlaceOrder";
import UpdateItems from "./pages/UpdateItems";
import Kitchen from "./pages/Kitchen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={PlaceOrder} />
          <Route path="/manage" component={UpdateItems} />
          <Route path="/kitchen" component={Kitchen} />
        </Switch>
      </div>
    );
  }
}

export default App;
