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
    <div>
      {/* using some bootstrap class */}
      <nav className="navbar navbar-light bg-dark  ">
        <img
          src={logo}
          style={{ width: "192px", height: "100px" }}
          alt="logo1"
        />
        <div className="col-md-6">
          <ul className="nav text-warning font-weight-normal">
            <li className="nav-item">
              <Link className="nav-link text-light active" to="/">
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

        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
          {!props.name ? (
            <div>
              <Link to="/signin">
                <button className="btn btn-outline-light me-md-2" type="button">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-light" type="button">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="d-grid gap-2 d-md-block">
              <button type="button" className="btn btn-outline-light">
                {props.name}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={signout}
              >
                Signout
              </button>
            </div>
            // <div className="dropdown">
            //   <button
            //     className="btn btn-secondary dropdown-toggle"
            //     type="button"
            //     id="dropdownMenu2"
            //     data-toggle="dropdown"
            //     aria-haspopup="true"
            //     aria-expanded="false"
            //   >
            //     {props.name}
            //   </button>
            //   <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            //     <button
            //       className="dropdown-item"
            //       type="button"
            //       onClick={signout}
            //     >
            //       Signout
            //     </button>
            //     <button className="dropdown-item" type="button">
            //       Profile
            //     </button>
            //   </div>
            // </div>
          )}
        </div>
      </nav>
    </div>
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
