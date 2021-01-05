import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
// import "./header.css";

var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001/", // Update 3001 with port on which backend-my-app/server.js is running.
      isEmployee: false
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <header>
        <nav>
          <ul className="header-nav">
            <li>
              <NavLink exact to="/">
                <img className="header-icon" src="../images/bobaIcon.png" alt="Boba icon that acts as a home button."></img>
              </NavLink>
            </li>
            <li>
              <NavLink to="/">Menu </NavLink>
            </li>
            <li>
              <NavLink to="/manage">Inventory </NavLink>
            </li>
            <li>
              <NavLink to="/kitchen"> Kitchen </NavLink>
            </li>
            <li>Staff Login</li> {/* click to open login code modal*/ }
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
