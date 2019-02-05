import React, { Component } from "react";

class YesterdayStats extends Component {
  render() {
    return (
      <div className="col-2">
        <span className="col-2 subhdr-title">Yesterday Stats</span>
        <div className="col-2 item">
          <span className="col-2 lbl">Demand:</span>
          <span className="col-2 deets">
            {Number(this.props.lemonadeDemand).toFixed(0)}
          </span>
        </div>
        <div className="col-2 item">
          <span className="col-2 lbl">Cups Sold:</span>
          <span className="col-2 deets">
            {Number(this.props.inventorySold).toFixed(0)}
          </span>
        </div>
        <div className="col-2 item">
          <span className="col-2 lbl">Revenue:</span>

          <span className="col-2 deets">
            ${Number(this.props.inventoryRevenue).toFixed(2)}
          </span>
        </div>
      </div>
    );
  }
}

export default YesterdayStats;
