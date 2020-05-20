import React, { Component } from "react";
import { generate } from "shortid";
import { Container } from "@material-ui/core";
import MyForm from "./MyForm.js";
import MyTable from "./MyTable.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      flights: [
        {
          id: "knd26GHI87",
          flightNo: "AN234",
          acReg: "9M-SBO",
          date: "12/12/2020",
          time: "9:00",
          from: "Terminal 2",
          to: "Petronas Base 3",
          company: "Sazma",
        },
        {
          id: "kjhd0348907",
          flightNo: "AN234",
          acReg: "9M-SBA",
          date: "12/12/2020",
          time: "9:00",
          from: "Terminal 2",
          to: "Petronas Base 3",
          company: "Sazma",
        },
      ],
    };
  }

  onSubmit = (formData) => {
    const storeInArr = [formData];

    const mappedData = storeInArr.map((field) => {
      const { flightNo, acReg, dateTime, from, to, company } = field;

      const time = dateTime.toLocaleTimeString("en-GB");
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

    const flightData = [
      // mappedData transforms from [{}] to {}
      ...mappedData,
      ...this.state.flights,
    ];

    console.log(flightData);

    this.setState({
      flights: flightData,
    });
  };

  render() {
    const { flights } = this.state;

    return (
      <div className="App" style={{ textAlign: "center" }}>
        <Container fixed>
          <MyForm onSubmit={this.onSubmit} />
          <MyTable flights={flights} />
        </Container>
      </div>
    );
  }
}

export default App;
