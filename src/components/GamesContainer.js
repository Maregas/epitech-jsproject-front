import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Game from "./Game";
import { retrieveGames } from "../actions/game-actions";
import "./styles/GamesContainer.css";

class GamesContainer extends Component {
  componentWillMount() {
    if (this.props.isLogged) this.props.OnGamesReceived(this.props.token);
  }

  render() {
    return (
      <div className="GContainerContentBody">
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <Grid container spacing={24}>
              {this.props.games.map(e => (
                <Grid key={e.name} item xs={4}>
                  <Game game={e} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  token: state.user.token,
  isLogged: state.logged
});

const mapActionsToProps = {
  OnGamesReceived: retrieveGames
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GamesContainer);
