import React, { Component } from "react";
//import Button from "./btn";

class Alert extends Component {
  render() {
    return (
      <div className="item">
        {this.props.alertvisible === true ? (
          <div color="info" role="alert">
            {this.props.alertmessage}
            <button onClick={this.props.onDismiss.bind(this, "alertvisible")}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default Alert;
