import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import LoginStyle from "./styles/Login.css";

const themeProvider = createMuiTheme({
  palette: {
    primary: { main: "#14b7ff" },
    secondary: { main: "#22cb8d" }
  }
});

const inputProps = {
  className: "LoginTextField"
};

const inputLabelProps = {};

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={themeProvider}>
        <TextField
          id="standard-name"
          label="Username"
          inputProps={inputProps}
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          id="standard-password-input"
          label="Password"
          className="LoginTextField"
          inputProps={inputProps}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <Button variant="extendedFab" color="primary" className="LoginButton">
          Connexion
        </Button>
      </MuiThemeProvider>
    );
  }
}

export default Login;
