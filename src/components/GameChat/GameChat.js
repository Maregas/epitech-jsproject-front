import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import io from "socket.io-client";
import { SERVER_SOCKET } from "../../serverConfig";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./GameChat.css";
import { connect } from "react-redux";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    position: "absolute",
    alignItems: "stretch",
    width: "100vw",
    paddingLeft: 10,
    height: "calc(100vh - 70px)"
  },
  controls: {
    flexDirection: "column-reverse",
    width: "100vw",
    alignItems: "stretch",
    display: "flex",
    height: 110
  },
  containerList: {
    display: "flex",
    flexDirection: "column-reverse",
    flex: 1,
    minHeight: 0,
    overflow: "auto"
  },
  bottomList: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  messageList: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    flex: 1,
    padding: 10,
    maxWidth: 1000
  },
  itemList: {
    margin: 5
  },
  nickname: {
    fontSize: "small",
    margin: 0
  }
});

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
      message: "",
      list: [],
      socket: io.connect(
        SERVER_SOCKET,
        {
          transports: ["websocket"]
        }
      ),
      roomName: this.props.match.params.id
    };

    const userName = this.props.user.nickname;
    this.state.socket.emit("room", {
      room: this.state.roomName,
      username: userName
    });

    this.state.socket.on("chat message", data => {
      const obj = {
        me: false,
        id: data.id,
        username: data.username,
        message: data.msg
      };
      if (data.username === userName) obj.me = true;

      const newArray = Array.from(this.state.list);
      newArray.push(obj);
      this.setState({
        list: newArray
      });
    });

    this.OnInputChange = this.OnInputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  OnInputChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  sendMessage() {
    const roomName = this.state.roomName;
    const userName = this.props.user.nickname;
    const message = this.state.message;

    this.state.socket.emit("chat message", {
      room: roomName,
      username: userName,
      msg: message
    });

    this.setState({
      message: ''
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={themeProvider}>
        <div className={classes.container}>
          <div className={classes.controls}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.sendMessage}
            >
              SEND
            </Button>

            <TextField
              id="message"
              label="Your Message here"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              onChange={this.OnInputChange}
              value={this.state.message}
              margin="normal"
            />
          </div>

          <div className={classes.containerList}>
            <div className={classes.bottomList}>
              <ul className={classes.messageList}>
                {this.state.list.map(e => (
                  <li key={e.id} className={classes.itemList}>
                    <p className={classes.nickname}>{e.username}</p>
                    {e.me ? (
                      <Chip
                        label={e.message}
                        color="primary"
                        className={classes.chip}
                      />
                    ) : (
                      <Chip
                        label={e.message}
                        color="secondary"
                        className={classes.chip}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

GameChat.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(GameChat));
