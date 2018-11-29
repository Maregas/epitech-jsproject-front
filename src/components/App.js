import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { checkTokenIsValid } from "../actions/user-actions";
import cookie from "react-cookies";
import Login from "./Login";
import "./styles/App.css";
import Loading from "./Loading";
import Register from "./Register";
import Home from "./Home";

class App extends Component {
  componentDidMount() {
    const token = cookie.load("USER_TOKEN");

    if (token) this.props.OnCheckValidToken(token);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-Body">
            {!this.props.isLogged && <Redirect from="/" to="/login" />}
            {this.props.isLogged && <Redirect from="/" to="/home" />}

            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {this.props.isLoading && <Loading />}
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading,
  isLogged: state.logged
});

const mapActionsToProps = {
  OnCheckValidToken: checkTokenIsValid
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
