import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  render() {
    return(
      <footer className="footer-container">
        <div className="footer-copyright">
          <span>© Crevice Corp</span>
        </div>
        <span>Boba Baba ™</span>
        <div className="footer-socials">
          <span>Insta</span>
          <span>Twitter</span>
          <span>About Us</span>
        </div>
      </footer>
    )
  }
}

export default Footer;
