import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { loginUser } from "../actions/user-actions";
import "./styles/Login.css";

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
  className: "LoginTextField"
};

const inputLabelProps = {
  className: "LoginInputLabel"
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.OnInputChange = this.OnInputChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
  }

  clickLogin() {
    const username = this.state.username;
    const password = this.state.password;
    this.props.OnLoginUser({
      email: username,
      password: password
    });
  }

  clickRegister() {
    this.props.history.push('/register')
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
          InputLabelProps={inputLabelProps}
          autoComplete="current-password"
          onChange={this.OnInputChange}
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          inputProps={inputProps}
          InputLabelProps={inputLabelProps}
          type="password"
          autoComplete="current-password"
          onChange={this.OnInputChange}
          margin="normal"
        />

        <Button
          variant="extendedFab"
          color="primary"
          className="LoginButton"
          onClick={this.clickLogin}
        >
          Connexion
        </Button>

        <Button
          variant="text"
          color="primary"
          className="LoginButton"
          onClick={this.clickRegister}
        >
          S'inscrire
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
