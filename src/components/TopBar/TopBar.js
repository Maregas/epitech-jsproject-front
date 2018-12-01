import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user-actions";
import "./TopBar.css";
import Button from "@material-ui/core/Button";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles/index";

const themeProvider = createMuiTheme({
  palette: {
    primary: { main: "#14b7ff" },
    secondary: { main: "#22cb8d" }
  }
});

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.clickLogout = this.clickLogout.bind(this);
  }

  clickLogout() {
    this.props.OnLogoutUser(this.props.token)
  }

  render() {
    return (
      <MuiThemeProvider theme={themeProvider}>
        <div className="TopBarContainer">
          <Button
            variant="contained"
            color="secondary"
            className="LogoutButton"
            onClick={this.clickLogout}
          >
            LOGOUT
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className="AccountButton"
            onClick={this.clickRegister}
          >
            Account
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapActionsToProps = {
  OnLogoutUser: logoutUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TopBar);
