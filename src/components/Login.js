import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { loginUser } from "../actions/user-actions";
import "./styles/Login.css";

const themeProvider = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: "#14b7ff" },
    secondary: { main: "#22cb8d" }
  }
});

const inputProps = {
  className: "LoginTextField"
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.OnInputChange = this.OnInputChange.bind(this);
    this.OnLoginUser = this.OnLoginUser.bind(this);
  }

  OnLoginUser() {
    const username = this.state.username;
    const password = this.state.password;
    this.props.OnLoginUser({
      username: username,
      password: password
    });
  }

  OnInputChange(e) {
    const id = e.target.id;

    if (id === "username") {
      this.setState({
        username: e.target.value
      });
    } else {
      this.setState({
        password: e.target.value
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={themeProvider}>
        <TextField
          id="username"
          label="Username"
          inputProps={inputProps}
          autoComplete="current-password"
          onChange={this.OnInputChange}
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          className="LoginTextField"
          inputProps={inputProps}
          type="password"
          autoComplete="current-password"
          onChange={this.OnInputChange}
          margin="normal"
        />
        <Button
          variant="extendedFab"
          color="primary"
          className="LoginButton"
          onClick={this.OnLoginUser}
        >
          Connexion
        </Button>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  OnLoginUser: loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
