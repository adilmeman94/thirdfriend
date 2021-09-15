import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./TF_logo1.png";
import { connect } from "react-redux";

function Navbar(props) {
  const history = useHistory();
  function signout() {
    localStorage.clear();
    history.push("/signin");
    const action = {
      type: "LOGOUT",
    };
    props.dispatch(action);
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            style={{ width: "184px", height: "58px" }}
            alt="logo1"
          />
        </Link>
        <button
          className="navbar-toggler order-first"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#account"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-user"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/howit">
                How It Works
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse margin-auth" id="account">
          {!props.name ? (
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/signin">
                  <button className="btn btn-secondary" type="button">
                    SignIn
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/signup">
                  <button className="btn btn-secondary" type="button">
                    SignUp
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <div className="dropdown text-center">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.name}
              </button>
              <div className="dropdown-menu dropdown-menu-right bg-dark text-center">
                <button
                  type="submit"
                  className="btn text-light"
                  aria-labelledby="dropdownMenuButton1"
                  onClick={signout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
function mapStateToProps(state) {
  return {
    name: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
