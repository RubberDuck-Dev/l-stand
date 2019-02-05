import React, { Component } from "react";
import "../src/App.css";
import Button from "./components/btn";
// import SetTomorrowValues from "./components/setTomorrowValues";
// import WeatherForecast from "./components/WeatherForecast";
// import YesterdayStats from "./components/YesterdayStats";
// import ChartJS from "./components/chart";

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

// hence each day is pushed onto GameData array
// var GameData = [InitialState];

// /// get last state of gamedata
// // so then you can render the 'next day' weather forecast, etc.
// this.state = GameData[GameData.length];

const initialState = {
  GameLogicData: {
    alertvisible: false,
    alertmessage: "",
    valueChanged: false,
    isNegative: false,
    showModalVal: false
  },

  1: {
    cashOnHand: 10,
    inventory: 0,
    demand: 0,
    cost: 0.5,
    price: 0,
    amtSold: 0,
    revenue: 0,
    profit: 0,
    weather_type: "Sunny",
    weather_temp: 75
  }
};

function ReturnRandomRange(min, max) {
  return Math.random() * (+max - min) + +min;
}

class Interface extends Component {
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

    this.setState({});
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

    this.setState({});

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
      <div className="container">
        <div className="item">
          This contains market information about the previous day
        </div>
        <div className="item">
          This contains purchasing information about today
        </div>
        <div className="item">
          This contains weather information about tomorrow
        </div>
        <div className="item">Reset Game</div>

        <div className="item">
          <Button message="Declare Bankruptcy" runFunction={this.ResetValues} />
        </div>
      </div>
    );
  }
}

export default Interface;
