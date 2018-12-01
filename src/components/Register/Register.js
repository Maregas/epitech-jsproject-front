import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { registerUser } from "../../actions/user-actions";
import logo from "../../logo.svg";
import "./Register.css";

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
  className: "RegisterTextField"
};

const inputLabelProps = {
  className: "RegisterInputLabel"
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.OnInputChange = this.OnInputChange.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickRegister() {
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    this.props.OnRegisterUser({
      email: email,
      nickname: username,
      password: password
    });
  }

  clickLogin() {
    this.props.history.push("/login");
  }

  OnInputChange(e) {
    const id = e.target.id;

    if (id === "username") {
      this.setState({
        username: e.target.value
      });
    } else if (id === "password") {
      this.setState({
        password: e.target.value
      });
    } else if (id === "email") {
      this.setState({
        email: e.target.value
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={themeProvider}>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="RegisterContentBody">
          <TextField
            id="email"
            label="Email"
            inputProps={inputProps}
            InputLabelProps={inputLabelProps}
            onChange={this.OnInputChange}
            margin="normal"
          />

          <TextField
            id="username"
            label="Username"
            inputProps={inputProps}
            InputLabelProps={inputLabelProps}
            onChange={this.OnInputChange}
            margin="normal"
          />

          <TextField
            id="password"
            label="Password"
            className="RegisterTextField"
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
            className="RegisterButton"
            onClick={this.clickRegister}
          >
            S'inscrire
          </Button>

          <Button
            variant="text"
            color="primary"
            className="LoginButton"
            onClick={this.clickLogin}
          >
            Se Connecter
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  OnRegisterUser: registerUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);
