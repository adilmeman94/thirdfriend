import React from "react";
import logo from "./TF_logo2.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/* using some bootstrap classNamees */}
      <nav className="navbar navbar-light bg-dark mb-0">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <img
              src={logo}
              style={{
                width: "184px",
                height: "38px",
                marginBottom: "10px",
              }}
              alt="logo2"
            />
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/contactus">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/terms">
              Terms &amp; Conditions
            </Link>
          </li>
        </ul>

        <div className="col-md-8">
          <div className="mt-4 text-center  bg-dark text-light">
            <p>
              {" "}
              ThirdFriend@ is a Registered Trademark of ThirdFriend Technology
              Pvt Ltd.
            </p>
            <p>CopyRight@2021 TTPL. All Rights Reserved</p>
          </div>
        </div>

        <ul className="navbar-nav ml-auto text-light d-inline-block">
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
      </nav>
    </div>
  );
}

export default Footer;
