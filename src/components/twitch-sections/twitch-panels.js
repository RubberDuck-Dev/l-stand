import React from "react";
import "./twitch.css";

export const Panel = () => {
  return (
    <div>
      <div className="panel">
        <i class="fa fas fa-tasks sub-panel" />
        <span>Previous Projects</span>
      </div>
      <br />
      <div className="panel">
        <i class="fa fas fa-question sub-panel" />
        <span>About</span>
      </div>
      <br />

      <div className="panel">
        <i class="fa far fa-desktop sub-panel" />
        <span>Streaming Info</span>
      </div>
    </div>
  );
};
