import React, { Component } from "react";
import { generate } from "shortid";
import { Container } from "@material-ui/core";
import MyForm from "../components/form/MyForm.js";
import MyTable from "../components/table/MyTable.js";
import "./App.css";

import DateFnsUtils from "@date-io/date-fns"; // Chosen Date lib
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import makeData from "../test/makeData"; // Fake data generator

class App extends Component {
  constructor() {
    super();
    this.state = {
      flights: [
        ...makeData(50),
        // {
        //   id: "knd26GHI87",
        //   flightNo: "AN234",
        //   acReg: "9M-SBO",
        //   date: "20/12/2020",
        //   time: "10:00",
        //   from: "Terminal 2",
        //   to: "Petronas Base 3",
        //   company: "Sazma",
        // },
      ],
    };
  }

  onSubmit = (formData) => {
    const storeInArr = [formData];

    const mappedData = storeInArr.map((field) => {
      const { flightNo, acReg, dateTime, from, to, company } = field;

      // Convert Date and Time into 24HR format (GB)
      const time = dateTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = dateTime.toLocaleDateString("en-GB");

      return {
        id: generate(),
        flightNo: flightNo,
        acReg: acReg,
        date: date,
        time: time,
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
        <Container fixed>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MyForm onSubmit={this.onSubmit} />
          </MuiPickersUtilsProvider>
          <MyTable flights={flights} deleteFlight={this.deleteFlight} />
        </Container>
      </div>
    );
  }
}

export default App;
