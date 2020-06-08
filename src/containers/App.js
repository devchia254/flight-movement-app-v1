import React, { Component } from "react";
import { generate } from "shortid";
import { Container } from "@material-ui/core";
import MyForm from "../components/form/MyForm.js";
import MyTable from "../components/table/MyTable.js";
import "./App.css";
import makeData from "../test/makeData"; // Fake data generator

// Material-UI Date Pickers (Moment Library)
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import MomentUtils from "@date-io/moment";
const moment = require("moment"); // require Moment library

class App extends Component {
  constructor() {
    super();
    this.state = {
      flights: [
        {
          id: "knd26GHI87",
          flightNo: "AN234",
          acReg: "9M-SBO",
          dateTime: "09/12/2020 10:00",
          from: "Terminal 2",
          to: "Petronas Base 3",
          company: "Sazma",
        },
        ...makeData(20),
      ],
    };
  }

  onSubmit = (formData) => {
    const storeInArr = [formData];

    const mappedData = storeInArr.map((field) => {
      const { flightNo, acReg, dateTime, from, to, company } = field;

      return {
        id: generate(),
        flightNo: flightNo,
        acReg: acReg,
        dateTime: moment(dateTime).format(), // String format: ISO 8601
        from: from,
        to: to,
        company: company,
      };
    });

    // Note: Switch mappedData and this.state.flights if you want object added at an end of the state array
    const flightData = [
      // mappedData transforms from [{}] to {}
      ...mappedData,
      ...this.state.flights,
    ];

    this.setState({
      flights: flightData,
    });
  };

  deleteFlight = (id, e) => {
    const { flights } = this.state;

    const updateFlights = flights.filter((flight, i, arr) => flight.id !== id);

    if (window.confirm("Are you sure?")) {
      this.setState({ flights: updateFlights });
    }
  };

  render() {
    const { flights } = this.state;

    return (
      <div className="App" style={{ textAlign: "center" }}>
        <h1> Flight Movement App</h1>
        <Container fixed>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MyForm onSubmit={this.onSubmit} />
            <MyTable flights={flights} deleteFlight={this.deleteFlight} />
          </MuiPickersUtilsProvider>
        </Container>
      </div>
    );
  }
}

export default App;
