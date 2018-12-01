import React, { Component } from "react";
import GamesContainer from "../GamesContainer/GamesContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loading from "../Loading/Loading";
import GameChat from "../GameChat/GameChat";
import TopBar from "../TopBar/TopBar";
import "./Home.css";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="HomeContentBody">
          <TopBar />
          <Route path="/game/:id" component={GameChat} />
          <Route exact path="/home" component={GamesContainer} />
          {this.props.isLoading && <Loading />}
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
)(Home);
