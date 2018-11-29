import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Game from "./Game";
import "./styles/GamesContainer.css";

class GamesContainer extends Component {

  render() {
    return (
      <div className="GContainerContentBody">
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <Grid container spacing={24}>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

              <Grid item xs={4}>
                <Game game="lol" />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default GamesContainer;
