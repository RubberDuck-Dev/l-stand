import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ColorPick } from "./ColorPick.js";

const ColorPickerGroup = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #dbdbdb;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ColorPicker = props => {
  return (
    <ColorPickerGroup>
      {Object.keys(props.theme).map(item => {
        return (
          <ThemeProvider key={item} theme={props.theme}>
            <ColorPick
              id={item}
              color={item}
              onClick={e => props.onClick(e)}
              theme={props.theme}
            >
              Hello
            </ColorPick>
          </ThemeProvider>
        );
      })}
    </ColorPickerGroup>
  );
};
