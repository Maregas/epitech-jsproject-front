import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./GameChat.css";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    position: "absolute",
    width: "100vw",
    height: "calc(100vh - 70px)"
  },
  messageList: {
    flexGrow : 1
  }
};

const themeProvider = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid #14b7ff"
        },
        "&:hover:not($disabled):before": {
          borderBottom: "1px solid #14b7ff"
        }
      }
    }
  },
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: "#14b7ff" },
    secondary: { main: "#22cb8d" }
  }
});

const inputProps = {
  className: "GameChatTextField"
};

const inputLabelProps = {
  className: "GameChatInputLabel"
};

class GameChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.OnInputChange = this.OnInputChange.bind(this);
  }

  OnInputChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={themeProvider}>
        <div className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={this.clickRegister}
          >
            SEND
          </Button>

          <TextField
            id="message"
            label="Your Message here"
            inputProps={inputProps}
            fullWidth={true}
            InputLabelProps={inputLabelProps}
            autoComplete="current-password"
            onChange={this.OnInputChange}
            margin="normal"
          />

          <div className={classes.messageList}>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

GameChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameChat);
