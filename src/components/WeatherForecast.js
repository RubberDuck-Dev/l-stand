import React, { Component } from "react";
import Button from "./btn";

class WeatherForecast extends Component {
  render() {
    return (
      <div className="col-3">
        <span className="col-3 subhdr-title">Weather Forecast</span>
        <div className="col-3 item">
          <span className="col-3 lbl">Type:</span>
          <span className="col-3 deets type-1">{this.props.weather_type}</span>
        </div>

        <div className="col-3 item">
          <span className="col-3 lbl">Temperature: </span>
          <span className="col-3 deets">{this.props.weather_temperature}</span>
        </div>
        <Button
          name="nextday"
          runFunction={this.props.RunNextDay}
          message="Next Day >>"
        />
      </div>
    );
  }
}

export default WeatherForecast;
