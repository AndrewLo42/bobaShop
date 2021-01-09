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

  renderStaffNav() {
    if(this.state.isEmployee){
      return(
        <div className="staff-nav main-nav">
          <li>
            <NavLink to="/manage">Inventory </NavLink>
          </li>
          <li>
            <NavLink to="/kitchen"> Kitchen </NavLink>
          </li>
        </div>
      )
    }
    return (<li onClick={()=>{this.setState({isEmployee: !this.state.isEmployee})}} className="staff-login" >Staff Login</li>);
  }

  render() {
    return (
      <header>
        <nav>
          <ul className="header-nav">
            <li>
              <NavLink exact to="/">
                <img className="ml-2 header-icon" src="../images/bobaIcon.png" alt="Boba icon that acts as a home button."></img>
              </NavLink>
            </li>
            <div className="main-nav">
              {this.renderStaffNav()}
              <li>
                <NavLink to="/">Menu </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
