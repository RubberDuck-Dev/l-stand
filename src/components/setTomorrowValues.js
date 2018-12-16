import React, { Component } from "react";
import Button from "./btn";
import Alert from "./Alert";

class SetTomorrowValues extends Component {
  render() {
    return (
      <div>
        <div className="item">
          <u className="subheader">Day #{this.props.day}</u>
          <div>Cash on Hand: ${Number(this.props.cash).toFixed(2)}</div>
          <div>
            Inventory: {Number(this.props.lemonade_inventory).toFixed(0)}
          </div>
          <div>
            Cost per Cup: ${Number(this.props.lemonade_cost).toFixed(2)}
          </div>
        </div>

        <div className="item">
          <div className="subheader">Sale Price</div>
          <b
            className={this.props.valueChanged ? "animated item" : "item"}
            style={
              this.props.valueChanged
                ? {
                    backgroundColor: "#FFFF00"
                  }
                : { backgroundColor: "transparent" }
            }
          >
            ${Number(this.props.lemonade_price).toFixed(2)}
          </b>
          <div className="item">
            <input
              type="range"
              id="start"
              name="saleprice"
              min="0"
              max="1.5"
              step="0.01"
              className="item"
              onChange={this.props.handlePriceSlide}
            />
          </div>
          <div>
            <b>Margin</b>
            <p
              className="item"
              style={
                this.props.isNegative === true
                  ? {
                      color: "#f44242"
                    }
                  : { color: "#000000" }
              }
              onChange={this.props.handlePriceSlide}
            >
              $
              {(
                Number(this.props.lemonade_price) -
                Number(this.props.lemonade_cost)
              ).toFixed(2)}
            </p>
          </div>
          <div>
            <b>Potential Revenue</b>
            <p className="card-text text-center">
              $
              {(
                Number(this.props.lemonade_price) *
                Number(this.props.lemonade_inventory)
              ).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="item">
          <div className="subheader">Buy Ingredients</div>
          <div className="btn-grp">
            <Button
              runFunction={this.props.incrementInventory}
              name="1"
              id="1"
              message="1"
            />
            <Button
              runFunction={this.props.incrementInventory}
              name="5"
              id="5"
              message="[5]"
            />
            <Button
              runFunction={this.props.incrementInventory}
              name="10"
              id="10"
              message="[10]"
            />
            <Button
              runFunction={this.props.incrementInventory}
              name={Number(this.props.cash) / Number(this.props.lemonade_cost)}
              id="max"
              message="[MAX]"
            />
          </div>
        </div>
        <Alert
          alertmessage={this.props.alertmessage}
          alertvisible={this.props.alertvisible}
          onDismiss={this.props.onDismiss}
        />
      </div>
    );
  }
}

export default SetTomorrowValues;
