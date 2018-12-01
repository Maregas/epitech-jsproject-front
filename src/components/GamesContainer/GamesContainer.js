import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Game from "../Game/Game";
import { retrieveGames } from "../../actions/game-actions";
import "./GamesContainer.css";

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
                <Grid key={e.id} item xs={12} md={6} lg={4}>
                  <Game game={e} history={this.props.history} />
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
