import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container-fluid main-div bg-dark">
      <div className="div1 mx-auto">
        <Link className="text-light" to="/contactus">
          <p> Contact Us </p>
        </Link>
        <Link className="text-light" to="/terms">
          <p>Terms &amp; Conditions </p>
        </Link>
      </div>
      <div className="div2 text-light mx-auto">
        <p>
          ThirdFriend@ is a Registered Trademark of ThirdFriend Technology Pvt
          Ltd.
        </p>
        <p>CopyRight@2021 TTPL. All Rights Reserved</p>
      </div>
      <div className="div3  mx-auto">
        <ul className="text-light d-inline-block">
          <li className="nav-item d-inline-block mr-4">
            <i className="fab fa-facebook fa-3x" id="facebook-logo" />
          </li>
          <li className="nav-item d-inline-block mr-4">
            <i className="fab fa-instagram fa-3x" id="instagram-logo" />
          </li>
          <li className="nav-item d-inline-block mr-4">
            <i className="fab fa-twitter fa-3x" id="twitter-logo" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
