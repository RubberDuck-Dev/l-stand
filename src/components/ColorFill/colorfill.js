import React from "react";
import styled from "styled-components";
import GameContainer from "./GameContainer.js";
import { ColorPicker } from "./ColorPicker.js";

const App = styled.div`
  width: 80%;
  margin: auto;
`;

const theme = {
  0: "blue",
  1: "red",
  2: "green",
  3: "yellow",
  4: "orange"
};

class ColorFill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 20,
      rows: 20,
      table: null,
      activeColor: 0
    };
  }

  toggleColor = e => {
    this.setState({ activeColor: e.target.id }, () => this.colorFill());
  };

  colorFill = () => {
    /*
      Logic: get activeColor (run this as a call back to this.toggleColor())

      loop over all cells in table

      check 1:
        does the cell match the activeColor?
      check 2:
        does the cell have a matching row/col as the current 'completed' table?
      
      
      */
    //console.log(this.state.table);
  };

  render() {
    return (
      <App>
        <h1>ColorFill</h1>
        <ColorPicker
          theme={theme}
          props={this.state}
          onClick={e => this.toggleColor(e)}
        />
        <GameContainer
          col={this.state.columns}
          row={this.state.rows}
          theme={theme}
        />
      </App>
    );
  }
}
export default ColorFill;
