import React, { Component } from "react";
import logo from "../logo.svg";
import Login from "./Login";
import "./styles/App.css";
import Loading from "./Loading";
import Register from "./Register"
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-Body">
            <img src={logo} className="App-logo" alt="logo" />

            <div className="ContentBody">
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              {this.props.isLoading && <Loading />}
            </div>
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

export default connect(
  mapStateToProps,
  {}
)(App);
