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
          date: "12-12-20",
          time: "9:00",
          from: "Terminal 2",
          to: "Petronas Base 3",
          company: "Sazma",
        },
      ],
    };
  }

  onSubmit = (data) => {
    const flightData = [
      {
        id: generate(),
        ...data,
      },
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
