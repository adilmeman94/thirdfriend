import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Signin from "./components/Signin";
import Traveller from "./components/Traveller";
import User from "./components/User";
import Signup from "./components/Signup";
import Aboutus from "./components/Others/Aboutus";
import Contactus from "./components/Others/Contactus";
import Howit from "./components/Others/Howit";
import Terms from "./components/Others/Terms";
import Notfoundpage from "./components/Others/Notfoundpage";

function PrivateRoute({ isLogin, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogin) {
          return <Redirect to="/signin" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
class App extends Component {
  componentDidMount() {
    const emailId = localStorage.getItem("email");
    if (emailId) {
      const action = {
        type: "LOGIN",
        payload: emailId,
      };
      this.props.dispatch(action);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/aboutus" component={Aboutus} />
            <Route exact path="/contactus" component={Contactus} />
            <Route exact path="/howit" component={Howit} />
            <Route exact path="/terms" component={Terms} />
            <Route
              exact
              path="/signin"
              // component={Signin}
              render={(props) => {
                if (this.props.user) {
                  return <Redirect to="/" />;
                } else {
                  return <Signin {...props} />;
                }
              }}
            />
            <Route
              exact
              path="/signup"
              // component={Signup}
              render={(props) => {
                if (this.props.user) {
                  return <Redirect to="/" />;
                } else {
                  return <Signup {...props} />;
                }
              }}
            />
            <PrivateRoute
              exact={true}
              path="/traveller"
              component={Traveller}
              isLogin={this.props.user}
            />
            <PrivateRoute
              exact={true}
              path="/user"
              component={User}
              isLogin={this.props.user}
            />
            <Route path="*" component={Notfoundpage} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
