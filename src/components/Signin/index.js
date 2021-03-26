import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";
import "bootstrap-css-only";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { getFromStorage, setInStorage } from "../utils/storage";
// import { Redirect } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      // token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      errors: [],
    };

    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  // componenetDidMount() {
  //   console.log("componentDidMount called");
  //   const obj = getFromStorage("the_main_app");
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // verify token
  //     fetch("http://localhost:9000/api/account/verify?token=" + token)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json);
  //         if (json.success) {
  //           this.setState({
  //             token: "",
  //             isLoading: false,
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }
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
      // this.setState({
      //   isLoading: true,
      // });
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
            // setInStorage("the_main_app", { token: json.token });
            localStorage.setItem("auth", JSON.stringify(json.token));
            console.log(json.token);
            toast.success(json.message);
            this.setState({
              signInError: json.message,
              //isLoading: false,
              signInEmail: "",
              signInPassword: "",
              token: json.token,
            });
          } else {
            toast.error(json.message);
            this.setState({
              signInError: json.message,
              //isLoading: false,
            });
          }

          if (localStorage.auth) {
            console.log(localStorage.auth);
            const action = {
              type: "LOGIN",
              payload: signInEmail,
              signInError,
            };
            this.props.dispatch(action);
          } else {
            console.log("Fail");
          }
        });
    }
  }

  render() {
    console.log("render");
    const {
      // isLoading,
      // token,
      // signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    // if (isLoading) {
    //   return (
    //     <div className="insidepage">
    //       <p>Loading....</p>
    //     </div>
    //   );
    // }

    // if (!token) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div className="homepage ">
        <ToastContainer position={"top-center"} />
        <div className="insidepage ">
          <div className="form ">
            <h3 className="signinheader">Welcome to ThirdFriend</h3>
            {/* {signInError ? <p>{signInError}</p> : null} */}
            <div className="box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                //className="input-box"
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
                Signin
              </button>
            </div>
            <div className="signinbr">
              Not on ThirdFriend Yet?
              <Link to="/signup">
                <strong>Sign Up</strong>
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
