import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";
import "bootstrap-css-only";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      errors: [],
    };

    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componenetDidMount() {
    console.log("componentDidMount called");
    const objToken = localStorage.getItem("auth");
    console.log(objToken, "takoen");
    if (objToken) {
      // verify token
      this.setState({
        isLoading: true,
      });
      fetch("http://localhost:9000/api/account/verify?token=" + objToken)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  onChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn(event) {
    event.preventDefault();
    //grab state
    const { signInEmail, signInPassword, signInError } = this.state;
    //VALIDATE
    var errors = [];

    //email
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(signInEmail).toLowerCase());

    if (!validEmail) {
      errors.push("signInEmail");
    }

    //password
    // const validPassword = /\S+@_&%+/;
    // if (!validPassword) {
    //   errors.push("signInPassword");
    // }
    if (signInPassword === "") {
      errors.push("signInPassword");
    }

    this.setState({
      errors: errors,
    });
    if (errors.length > 0) {
      return false;
    } else {
      this.setState({
        isLoading: true,
      });
      //post request to backend
      fetch("https://thirdfriend01.herokuapp.com/api/account/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.success) {
            localStorage.setItem("auth", JSON.stringify(json.token));
            console.log(json.token);
            toast.success(json.message);
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInEmail: "",
              signInPassword: "",
              token: json.token,
            });
          } else {
            toast.error(json.message);
            this.setState({
              isLoading: false,
              signInError: json.message,
            });
          }
          if (localStorage.auth) {
            setTimeout(() => {
              const action = {
                type: "LOGIN",
                payload: signInEmail,
                signInError,
              };
              this.props.dispatch(action);
            }, 3000);
          } else {
            console.log("Fail");
          }
        });
    }
  }

  render() {
    console.log("render");
    const { signInEmail, signInPassword } = this.state;

    return (
      <div className="homepage ">
        <ToastContainer position={"top-center"} />
        <div className="insidepage col-lg-5 col-md-6 col-sm-7 col-xs-12 custom-width">
          <div className="form">
            <h3 className="signinheader mt-5">Welcome To ThirdFriend</h3>
            <div className="box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                autoComplete="off"
                className={
                  this.hasError("signInEmail")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={signInEmail}
                onChange={this.onChangeSignInEmail}
                placeholder="Enter email"
                name="email"
              ></input>
              <div
                className={
                  this.hasError("signInEmail") ? "inline-errormsg" : "hidden"
                }
              >
                Email is invalid or missing
              </div>
            </div>
            <div className="box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                //className="input-box"
                autoComplete="off"
                className={
                  this.hasError("signInPassword")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={signInPassword}
                onChange={this.onChangeSignInPassword}
                placeholder="Enter password"
                name="password"
              ></input>
              <div
                className={
                  this.hasError("signInPassword") ? "inline-errormsg" : "hidden"
                }
              >
                Please enter a password
              </div>
            </div>
            <br></br>
            <div className="box1">
              <button className="btn btn-success" onClick={this.onSignIn}>
                {this.state.isLoading ? "Loading..." : "Signin"}
              </button>
            </div>
            <div className="signinbr mb-5">
              Not on ThirdFriend Yet?
              <Link to="/signup">
                <strong>SignUp</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Signin);
