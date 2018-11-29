import React, { Component } from "react";
import GamesContainer from "./GamesContainer";
import "./styles/Home.css";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
        <div className="HomeContentBody">
          <GamesContainer />
        </div>
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
