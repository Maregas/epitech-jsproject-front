import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="LoadingContainer">
        <div className="lds-css ng-scope">
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
