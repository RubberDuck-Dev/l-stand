import React from "react";
import styled, { ThemeProvider } from "styled-components";

const ColorSelected = styled.div`
  background-color: ${props => (props = props.theme[props.color])};
  color: ${props => (props = props.theme[props.color])};
  border: 1px solid ${props => (props = props.theme[props.color])};
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-left: 10px;

  &:hover {
    filter: brightness(85%);
  }
`;

export const ColorPick = props => {
  return (
    <ThemeProvider key={props.id} theme={props.theme}>
      <ColorSelected
        id={props.id}
        color={props.id}
        onClick={e => props.onClick(e)}
      >
        Hello
      </ColorSelected>
    </ThemeProvider>
  );
};
