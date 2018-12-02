import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { loginUser } from "../../actions/user-actions";
import { setError } from "../../actions/error-actions";
import "./Login.css";
import logo from "../../logo.svg";

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

function getModalStyle() {
  return {
    top: "50vh",
    left: "50vw"
  };
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      open: false
    };
    this.OnInputChange = this.OnInputChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
  }

  clickLogin() {
    const username = this.state.username;
    const password = this.state.password;

    if (username && password) {
      this.props.OnLoginUser({
        email: username,
        password: password
      });
    } else {
      this.handleOpen();
    }
  }

  clickRegister() {
    this.props.history.push("/register");
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

  handleOpen = () => {
    this.props.OnErrorClose(true);
  };

  handleClose = () => {
    this.props.OnErrorClose(false);
  };

  render() {
    return (
      <MuiThemeProvider theme={themeProvider}>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="LoginContentBody">
          <TextField
            id="username"
            label="Email"
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
          
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className="ModalLogin">
              <Typography variant="h6" id="modal-title" color="error">
                Erreur
              </Typography>
              <Typography
                variant="subtitle1"
                id="simple-modal-description"
                color="error"
              >
                Une erreur est survenue !
              </Typography>
              <Button
                variant="text"
                color="primary"
                className="LoginModalButton"
                onClick={this.handleClose}
              >
                OK
              </Button>
            </div>
          </Modal>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isError: state.error
});

const mapActionsToProps = {
  OnLoginUser: loginUser,
  OnErrorClose: setError
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
