import React from "react";
//import ColorFill from "./components/ColorFill/colorfill.js";
import { Panel } from "./components/twitch-sections/twitch-panels.js";

import "../src/App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Panel />
        {/* <ColorFill /> */}
      </div>
    );
  }
}

export default App;
