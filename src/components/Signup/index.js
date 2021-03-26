import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import "bootstrap-css-only";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      errors: [],
    };

    this.onChangeSignUpFirstName = this.onChangeSignUpFirstName.bind(this);
    this.onChangeSignUpLastName = this.onChangeSignUpLastName.bind(this);
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  onChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp(event) {
    event.preventDefault();
    //grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;
    //VALIDATE
    var errors = [];

    //firstname
    if (signUpFirstName === "") {
      errors.push("signUpFirstName");
    }

    //lastname
    if (signUpLastName === "") {
      errors.push("signUpLastName");
    }

    //email
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(signUpEmail).toLowerCase());

    if (!validEmail) {
      errors.push("signUpEmail");
    }

    //password
    if (signUpPassword === "") {
      errors.push("signUpPassword");
    }

    this.setState({
      errors: errors,
    });
    if (errors.length > 0) {
      return false;
    } else {
      //post request to backend
      fetch("https://thirdfriend01.herokuapp.com/api/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            toast.success("Signup done  Successfully!!!");
            this.setState({
              signUpError: json.message,
              signUpFirstName: "",
              signUpLastName: "",
              signUpEmail: "",
              signUpPassword: "",
            });
            this.props.history.push({
              pathname: "/signin",
            });
          } else {
            toast.error(json.message);
            this.setState({
              signUpError: json.message,
            });
          }
        });
    }
  }

  render() {
    const {
      // signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    return (
      <div className="homepage">
        <ToastContainer position={"top-center"} />
        <div className="insidepage">
          <div className="form">
            <h3 className="signupheader">CREATE ACCOUNT</h3>
            {/* <div align="center">
              {" "}
              {signUpError ? <p>{signUpError}</p> : null}{" "}
            </div> */}
            <div className="box">
              <label htmlFor="firstname">First Name</label>
              <input
                type="firstname"
                // className="input-box "
                autoComplete="off"
                className={
                  this.hasError("signUpFirstName")
                    ? "form-control is-invalid "
                    : "form-control"
                }
                value={signUpFirstName}
                onChange={this.onChangeSignUpFirstName}
                placeholder="Enter firstname "
                name="name"
              ></input>
              <div
                className={
                  this.hasError("signUpFirstName")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Please enter firstname
              </div>
            </div>
            <div className="box">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="lastname"
                // className="input-box"
                className={
                  this.hasError("signUpLastName")
                    ? "form-control is-invalid "
                    : "form-control"
                }
                value={signUpLastName}
                onChange={this.onChangeSignUpLastName}
                placeholder="Enter lastname"
                name="name"
              ></input>

              <div
                className={
                  this.hasError("signUpLastName") ? "inline-errormsg" : "hidden"
                }
              >
                Please enter lastname
              </div>
            </div>
            <div className="box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                //className="input-box"
                autoComplete="off"
                className={
                  this.hasError("signUpEmail")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={signUpEmail}
                onChange={this.onChangeSignUpEmail}
                placeholder="Enter email"
                name="email"
              ></input>
              <div
                className={
                  this.hasError("signUpEmail") ? "inline-errormsg" : "hidden"
                }
              >
                Email is invalid or missing
              </div>
            </div>
            <div className="box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                // className="input-box"
                autoComplete="off"
                className={
                  this.hasError("signUpPassword")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={signUpPassword}
                onChange={this.onChangeSignUpPassword}
                placeholder="Enter password"
                name="password"
              ></input>
              <div
                className={
                  this.hasError("signUpPassword") ? "inline-errormsg" : "hidden"
                }
              >
                Please enter a password
              </div>
            </div>
            <br></br>
            <div className="box1">
              <button className="btn btn-success " onClick={this.onSignUp}>
                SignUp
              </button>
            </div>
            <div className="signupbr">
              Have already an account?{" "}
              <Link to="/signin">
                <strong>Sign In</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
