import React from "react";
import styled, { ThemeProvider } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vw;
  min-height: 360px;
  max-height: 80vh;
`;

const Cell = styled.div`
  width: 10%;
  background-color: ${props => (props = props.theme[props.color])};
`;

const GameContainer = props => {
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generateInitialColors = () => {
    const colorVal = getRndInteger(0, 5);
    return colorVal;
  };

  const createTable = () => {
    let table = [];

    for (let i = 0; i < props.col; i++) {
      let children = [];
      for (let j = 0; j < props.row; j++) {
        const colorVal = generateInitialColors();

        children.push(
          <ThemeProvider theme={props.theme} key={`${i}-${j}`}>
            <Cell row={j + 1} color={colorVal} col={i + 1} />
          </ThemeProvider>
        );
      }

      table.push(<Cell key={`${i}`}>{children}</Cell>);
    }
    return table;
  };

  return <Container>{props.table}</Container>;
};

export default GameContainer;
