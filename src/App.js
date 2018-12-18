import React, { Component } from "react";
import "../src/App.css";
import Button from "./components/btn";
import SetTomorrowValues from "./components/setTomorrowValues";
import WeatherForecast from "./components/WeatherForecast";
import YesterdayStats from "./components/YesterdayStats";
import ChartJS from "./components/chart";

//import Alert from "./components/Alert";

// const btn = require('./btn');

var weatherTypeArray = ["Sunny", "Mostly Sunny", "Mostly Cloudy", "Rainy"];

/*
To figure out:
Can i pass state = "this.state" into another component and parse it then,
or does it have to be price=this.state.price, cost=this.state.cost, etc.
*/

/*
GAME ELEMENTS
TO DOs:
- Factor in CAT/Random Events
  -lemonade spoiling

  - Logging daily results
  - chart demand/rev/profit/inventory/cash on hand over time

- timed? limit to a certain # of days
  - high score tracked across users
*/

// let results = {
//   day1: {
//     demand,
//     revenue,
//     profit,
//     weather
//   },
//   day2: {
//     demand,
//     revenue,
//     profit,
//     weather
//   },
//   day3: {
//     demand,
//     revenue,
//     profit,
//     weather
//   }
// };

/* every day, array.push() to add the next object */

// const InitialState = {
//   day: 1,
//   cash: 10,
//   weather: {
//     label: "Sunny",
//     temp: 75
//   },
//   product: {
//     inventory: 0,
//     cost: 0.5,
//     price: 0.75,
//     sold: 0
//   },
//   interface: {
//     alertvisible: false,
//     alertmessage: "",
//     valueChanged: false,
//     isNegative: false,
//     showModalVal: false
//   }
// };

// // hence each day is pushed onto GameData array
// var GameData = [InitialState];

// /// get last state of gamedata
// // so then you can render the 'next day' weather forecast, etc.
// this.state = GameData[GameData.length];

const initialState = {
  day: 1,
  cash: 10.0,
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
  showModalVal: false,
  historicResults: {},
  cupsBought: {
    1: {
      inventoryBought: 0,
      mktPrice: 0,
      marginCommitted: 0,
      dailyTotBought: 0
    }
  },
  dailyTotBought: 0
};

function ReturnRandomRange(min, max) {
  return Math.random() * (+max - min) + +min;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState; //{ GameData: initialState, GameInterface: intialinterface };

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
    var WTypeMax = weatherTypeArray.length - 1;

    var TomorrowWeatherTypeSeed = ReturnRandomRange(WTypeMin, WTypeMax);

    var TomorrowWeatherType =
      weatherTypeArray[TomorrowWeatherTypeSeed.toFixed(0)];

    //weather temperature
    var WTMin = 50;
    var WTMax = 100;
    var TomorrowWeatherTemp = ReturnRandomRange(WTMin, WTMax);

    //lemonade costs
    var LCMin = 0.25;
    var LCMax = 1.75;
    var currentLemonadeCost = ReturnRandomRange(LCMin, LCMax);

    this.setState({
      lemonade_cost: currentLemonadeCost.toFixed(2),
      weather_type: TomorrowWeatherType,
      weather_temperature: TomorrowWeatherTemp.toFixed(0)
    });
  }

  incrementInventory(amt) {
    /*passing in 'this.props' button data and parse out the values from there.
      intention is to be more robust so that you can use the Button Component for more than function.
    */

    //1,5,10,All
    const amtPurchased = parseFloat(amt.name);

    if (
      (this.state.cash - this.state.lemonade_cost * amtPurchased).toFixed(2) < 0
    ) {
      var SetAlertVisible = true;
      var SetAlertMessage = "Not enough cash!";

      this.setState({
        alertvisible: SetAlertVisible,
        alertmessage: SetAlertMessage
      });

      return;
    }

    /*Cannot pass in duplicate keys to object,
  how to: add a 'daily total' of cups bought */

    let currentCupsBought = {
      ...this.state.cupsBought,
      [this.state.day]: {
        inventoryBought: +amtPurchased,
        mktPrice: this.state.lemonade_cost,
        marginCommitted: amtPurchased * this.state.lemonade_cost,
        dailyTotBought: this.state.dailyTotBought + +amtPurchased
      }
    };

    this.setState(
      {
        lemonade_inventory: this.state.lemonade_inventory + +amtPurchased,
        cash: this.state.cash - this.state.lemonade_cost * amtPurchased,
        cupsBought: currentCupsBought,
        dailyTotBought: this.state.dailyTotBought + +amtPurchased
      }
      //,() => console.log(this.state.cupsBought)
    );
  }

  RunNextDay(btn) {
    //console.log(btn);

    var IncrementDay = this.state.day + 1;

    //calculate cups sold
    var BCMin = 1;
    var BCMax = 50;

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

    let updatedHistoricResults = {
      ...this.state.historicResults,
      ["Day" + this.state.day]: {
        demand: currentDemand,
        cupSold: totCupsSold,
        price: this.state.lemonade_price,
        revenue: this.state.lemonade_price * totCupsSold,
        weather_temp: this.state.weather_temperature.day,
        weather_type: this.state.weather_type
      }
    };

    // chartData = {};

    // updateChartData = { ...chartData };
    // Object.keys(updatedHistoricResults).map(key=>console.log(key)

    // const chartData = {
    //   labels: [this.state.cupsBought[day]],
    //   datasets: [Object.keys(this.state.cupsBought).map(key=> key)]
    //     {
    //       label: "CupsBoughtPerDay",
    //       data: [this.state.cupsBought[DAY].dailyTotBought],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //     ],
    //     borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //     ],
    //     borderWidth: 1
    // }]
    // };

    this.setState(
      {
        day: IncrementDay,
        inventorySold: totCupsSold,
        lemonade_inventory: +this.state.lemonade_inventory - totCupsSold,
        inventoryRevenue: +totCupsSold * +this.state.lemonade_price,
        lemonadeDemand: currentDemand,
        cash: +this.state.cash + +totCupsSold * +this.state.lemonade_price,
        alertvisible: false,
        alertmessage: "",
        valueChanged: false,
        historicResults: updatedHistoricResults,
        dailyTotBought: 0
      }
      //() => console.log(this.state.historicResults)
    );

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
        {/* <ChartJS /> */}
        <div className="header">Lemonade Stand</div>
        <div className="container">
          <div className="item item-1">
            <YesterdayStats
              lemonadeDemand={this.state.lemonadeDemand}
              inventoryRevenue={this.state.inventoryRevenue}
              inventorySold={this.state.inventorySold}
              valueChanged={this.state.valueChanged}
              highlightChange={this.highlightChange}
              isNegative={this.state.isNegative}
            />
          </div>
          <div className="item item-2">
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
          </div>
          <div className="item item-3">
            <WeatherForecast
              weather_type={this.state.weather_type}
              weather_temperature={this.state.weather_temperature}
              RunNextDay={this.RunNextDay}
            />
          </div>
          <div className="item">
            {Object.keys(this.state.cupsBought).map(key => {
              return (
                <div>
                  <p>
                    Day Bought:
                    <span>{[key]}</span>
                  </p>
                  <p>
                    Cups Bought:
                    <span>
                      {this.state.cupsBought[key].dailyTotBought.toFixed(0)}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* let currentCupsBought = {
              ...this.state.cupsBought,
              [this.state.day]: {
                inventoryBought: +amtPurchased,
                mktPrice: this.state.lemonade_cost,
                marginCommitted: amtPurchased * this.state.lemonade_cost,
                dailyTotBought: this.state.dailyTotBought + +amtPurchased
              }
    }; */}

          <div className="item">
            <BankruptModal
              show={this.state.showModalVal}
              handleClose={this.hideModal}
              onClick={this.ResetValues}
            />
          </div>
          {/* BankrupcyButton */}
          <div className="item ">
            <Button
              className="bankrupt"
              message="Declare Bankruptcy"
              runFunction={this.showModal}
            />
          </div>
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
            <button type="button" className="btn" onClick={onClick}>
              Yes
            </button>
            <button
              type="button"
              className="btn"
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
