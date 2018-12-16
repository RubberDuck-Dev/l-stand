import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    /*// currently no need for the toggled state
      this.setState({ toggled: !this.state.toggled });*/

    this.props.runFunction(this.props);
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={`${this.props.className} btn`}
        //className={this.state.toggled ? "btn toggled" : "btn"}
      >
        {this.props.message}
      </button>
    );
  }
}

export default Button;
