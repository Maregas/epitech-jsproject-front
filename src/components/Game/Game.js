import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345,
    maxHeight: 300
  },
  media: {
    height: 120
  },
  desc: {
    maxHeight: 50,
    overflowY: "auto"
  }
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.goToGame = this.goToGame.bind(this);
  }

  goToGame(e) {
    const idRoom = this.props.game.id + '-' + this.props.game.name;
    this.props.history.push("/game/" + idRoom);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.props.game.background_image_url}
            title={this.props.game.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.game.name}
            </Typography>
            <Typography className={classes.desc} component="p">
              {this.props.game.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            value={this.props.game.id}
            onClick={this.goToGame}
            size="small"
            color="primary"
          >
            GO TO
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
