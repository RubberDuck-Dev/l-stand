import React, { Component } from "react";

var weatherTypeArray = ["Sunny", "Mostly Sunny", "Mostly Cloudy", "Rainy"];

const initialState = {
  day: 1,
  cash: 20.0,
  lemonade_inventory: 0,
  lemonade_cost: 0.5,
  lemonade_price: 0.75,
  inventorySold: 0,
  lemonadeDemand: 0,

  inventoryRevenue: 0,
  weather_type: "Sunny",
  weather_temperature: 75,

  alertvisible: false,
  alertmessage: "",
  valueChanged: false,
  isNegative: false,
  showModalVal: false
};

function ReturnRandomRange(min, max) {
  return Math.random() * (+max - min) + +min;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.SetWeatherCondition = this.SetWeatherCondition.bind(this);
    this.incrementInventory = this.incrementInventory.bind(this);
    this.RunNextDay = this.RunNextDay.bind(this);
    this.handlePriceSlide = this.handlePriceSlide.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.highlightChange = this.highlightChange.bind(this);
    this.checkNegative = this.checkNegative.bind(this);
    this.ResetValues = this.ResetValues.bind(this);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ showModalVal: true });
  };

  hideModal = () => {
    this.setState({ showModalVal: false });
  };

  ResetValues() {
    //declare bankruptcy through Modal

    this.setState(initialState);
  }

  checkNegative(value) {
    if (Number(value) < 0) {
      var NegativeCheck = true;
    }
    this.setState({ isNegative: NegativeCheck });
  }

  highlightChange(value) {
    this.checkNegative(value);
    this.setState({ valueChanged: true });
  }

  onDismiss(param) {
    this.setState({
      [param]: false
    });
  }

  SetWeatherCondition() {
    //weather type
    var WTypeMin = 0;
    var WTypeMax = weatherTypeArray.length;

    var TomorrowWeatherTypeSeed = ReturnRandomRange(WTypeMin, WTypeMax);

    var TomorrowWeatherType =
      weatherTypeArray[TomorrowWeatherTypeSeed.toFixed(0)];

    //weather temperature
    var WTMin = 50;
    var WTMax = 100;
    var TomorrowWeatherTemp = ReturnRandomRange(WTMin, WTMax);

    //lemonade costs
    var LCMin = 0.1;
    var LCMax = 1.0;
    var currentLemonadeCost = ReturnRandomRange(LCMin, LCMax);

    this.setState({
      lemonade_cost: currentLemonadeCost.toFixed(2),
      weather_type: TomorrowWeatherType,
      weather_temperature: TomorrowWeatherTemp.toFixed(0)
    });
  }

  incrementInventory(amt) {
    //1,5,10,All

    if ((this.state.cash - this.state.lemonade_cost * amt).toFixed(2) < 0) {
      var SetAlertVisible = true;
      var SetAlertMessage = "Not enough cash!";

      this.setState({
        alertvisible: SetAlertVisible,
        alertmessage: SetAlertMessage
      });

      return;
    }

    this.setState({
      lemonade_inventory: this.state.lemonade_inventory + +amt,
      cash: this.state.cash - this.state.lemonade_cost * amt
    });
  }

  RunNextDay() {
    var IncrementDay = this.state.day + 1;

    //calculate cups sold
    var BCMin = 1;
    var BCMax = 100;

    var baseCupsSold = ReturnRandomRange(BCMin, BCMax);

    //modifer for price
    var priceMod = (100 - this.state.lemonade_price) / 100;
    //modifier for weather type
    var wtypeMod = 1;
    //modifier for weather temp
    var wtempMod = this.state.weather_temperature / 50;

    var totCupsSold = Math.min(
      baseCupsSold * priceMod * wtypeMod * wtempMod,
      this.state.lemonade_inventory
    );

    //calculate demand
    var currentDemand = baseCupsSold * priceMod * wtypeMod * wtempMod;

    if (this.state.lemonade_inventory === 0) {
      totCupsSold = 0;
    }

    this.setState({
      day: IncrementDay,
      inventorySold: totCupsSold,
      lemonade_inventory: +this.state.lemonade_inventory - totCupsSold,
      inventoryRevenue: +totCupsSold * +this.state.lemonade_price,
      lemonadeDemand: currentDemand,
      cash: +this.state.cash + +totCupsSold * +this.state.lemonade_price,
      alertvisible: false,
      alertmessage: "",
      valueChanged: false
    });

    //Set tomorrow's weather forecast
    this.SetWeatherCondition();
  }

  handlePriceSlide(event) {
    //price input slider, display the value
    this.highlightChange(this.state.lemonade_price - this.state.lemonade_cost);

    this.setState({ lemonade_price: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Lemonade Stand</h1>
        <div className="container">
          <div className="card-group">
            <YesterdayStats
              lemonadeDemand={this.state.lemonadeDemand}
              inventoryRevenue={this.state.inventoryRevenue}
              inventorySold={this.state.inventorySold}
              valueChanged={this.state.valueChanged}
              highlightChange={this.highlightChange}
              isNegative={this.state.isNegative}
            />
            <SetTomorrowValues
              day={this.state.day}
              cash={this.state.cash}
              lemonade_inventory={this.state.lemonade_inventory}
              lemonade_cost={this.state.lemonade_cost}
              lemonade_price={this.state.lemonade_price}
              alertvisible={this.state.alertvisible}
              alertmessage={this.state.alertmessage}
              incrementInventory={this.incrementInventory}
              handlePriceSlide={this.handlePriceSlide}
              onDismiss={this.onDismiss}
              valueChanged={this.state.valueChanged}
              highlightChange={this.highlightChange}
              isNegative={this.state.isNegative}
            />

            <WeatherForecast
              weather_type={this.state.weather_type}
              weather_temperature={this.state.weather_temperature}
              RunNextDay={this.RunNextDay}
            />

            <BankruptModal
              show={this.state.showModalVal}
              handleClose={this.hideModal}
              onClick={this.ResetValues}
            />

            {/* BankrupcyButton */}
            <div className="row">
              <div className="col">
                <div className="card card-sm">
                  <div className="card-body">
                    <div
                      className="btn btn-danger btn-sm"
                      onClick={this.showModal}
                    >
                      Declare Bankruptcy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class YesterdayStats extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card card-sm">
            <div className="card-body">
              <h5 className="card-title">
                <u>Yesterday Stats</u>
              </h5>
              <div className="card-text">
                <b>Demand</b>
                <p className="card-text text-right">
                  {Number(this.props.lemonadeDemand).toFixed(0)}
                </p>
              </div>
              <div className="card-text">
                <b>Cups Sold</b>
                <p className=" card-text text-right">
                  {Number(this.props.inventorySold).toFixed(0)}
                </p>
              </div>
              <div className="card-text">
                <b>Revenue</b>
                <p className="card-text text-right">
                  ${Number(this.props.inventoryRevenue).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SetTomorrowValues extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card card-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <u>Day #{this.props.day}</u>
                </h5>
                <div>Cash on Hand: ${Number(this.props.cash).toFixed(2)}</div>
                <div>
                  Inventory: {Number(this.props.lemonade_inventory).toFixed(0)}
                </div>
                <div>
                  Cost per Cup: ${Number(this.props.lemonade_cost).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card card-sm">
              <div className="card-body">
                <h6 className="card-title">Sale Price</h6>
                <b
                  className={
                    this.props.valueChanged
                      ? "animated card card-text text-center"
                      : "card card-text text-center"
                  }
                  style={
                    this.props.valueChanged
                      ? {
                          backgroundColor: "#FFFF00"
                        }
                      : { backgroundColor: "transparent" }
                  }
                  //className="card text-center"
                >
                  ${Number(this.props.lemonade_price).toFixed(2)}
                </b>
                <div className="form-group">
                  <input
                    type="range"
                    id="start"
                    name="saleprice"
                    min="0"
                    max="1.5"
                    step="0.01"
                    className="form-control-range"
                    onChange={this.props.handlePriceSlide}
                  />
                </div>
                <div>
                  <b>Margin</b>
                  <p
                    className="card-text text-center"
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
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card card-sm">
              <div className="card-body">
                <h6 className="card-title">
                  <u>Buy Ingredients</u>
                </h6>
                <div className="btn-group">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={this.props.incrementInventory.bind(this, 1)}
                  >
                    [1]
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={this.props.incrementInventory.bind(this, 5)}
                  >
                    [5]
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={this.props.incrementInventory.bind(this, 10)}
                  >
                    [10]
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={this.props.incrementInventory.bind(
                      this,
                      Number(this.props.cash) / Number(this.props.lemonade_cost)
                    )}
                  >
                    MAX [
                    {(
                      Number(this.props.cash) / Number(this.props.lemonade_cost)
                    ).toFixed(0)}
                    ]
                  </button>
                </div>
              </div>
            </div>
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

class WeatherForecast extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card card-sm">
            <div className="card-body">
              <h6 className="card-title">
                <u>Weather Forecast</u>
              </h6>
              <div className="card-text">Type: {this.props.weather_type}</div>
              <div className="card-text">
                Temperature: {this.props.weather_temperature}
              </div>
              <div
                className="btn btn-info btn-sm"
                onClick={this.props.RunNextDay}
              >
                Next Day >>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Alert extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          {this.props.alertvisible === true ? (
            <div
              color="info"
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {this.props.alertmessage}
              <button
                className="close"
                onClick={this.props.onDismiss.bind(this, "alertvisible")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const BankruptModal = ({ handleClose, show, onClick }) => {
  const displayModal = show ? "block" : "none";

  return (
    <div
      className="modal"
      style={{ display: displayModal }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">Declare Bankruptcy?</h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClick}>
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
