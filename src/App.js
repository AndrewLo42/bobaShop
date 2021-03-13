import React, { Component } from "react";
// import "./App.css";
import { Header } from "./global/header.js";
import { Switch, Route } from "react-router-dom";

import PlaceOrder from "./pages/PlaceOrder";
import UpdateItems from "./pages/UpdateItems";
import Kitchen from "./pages/Kitchen";
import Footer from "./global/footer.js";
import Menu from "./pages/Menu.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route path="/manage" component={UpdateItems} />
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/menu" component={PlaceOrder} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
