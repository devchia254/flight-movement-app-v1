import React, { Component } from "react";
import { generate } from "shortid";
import { Container } from "@material-ui/core";
import ScheduleModal from "../components/modals/ScheduleModal.js";
// import ScheduleForm from "../components/forms/ScheduleForm.js";
import ScheduleTable from "../components/table/ScheduleTable.js";
import "./App.css";
import makeData from "../test/makeData"; // Fake data generator

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Material-UI Date Pickers (Moment Library)
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import MomentUtils from "@date-io/moment";
const moment = require("moment"); // require Moment library

class SchedulePage extends Component {
  constructor() {
    super();
    this.state = {
      flights: [
        // {
        //   id: "knd26GHI87",
        //   flightNo: "AN234",
        //   acReg: "9M-SBO",
        //   dateTime: "09/12/2020 10:00",
        //   from: "Terminal 2",
        //   to: "Petronas Base 3",
        //   company: "Sazma",
        // },
        ...makeData(20),
      ],
      open: false,
    };
  }

  addFlight = (formData) => {
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

  // Edit Product
  editFlight = (id, modalFormData) => {
    const { flights } = this.state;

    const initialFlights = [...flights];

    const filterFlight = initialFlights.map((flight) => {
      if (id === flight.id) {
        // This object clones the product that satisfies the condition above and assigns the corresponding property values from 'editDetails'.
        return {
          ...flight,
          ...modalFormData,
        };
      }
      return flight;
    });

    this.setState({ flights: filterFlight });
  };

  deleteFlight = (id, e) => {
    const { flights } = this.state;

    const updateFlights = flights.filter((flight, i, arr) => flight.id !== id);

    if (window.confirm("Are you sure?")) {
      this.setState({ flights: updateFlights });
    }
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { flights } = this.state;

    return (
      <div className="BoardUser" style={{ textAlign: "center" }}>
        <h1>Schedule flight</h1>
        <Container fixed>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Button variant="outlined" color="primary" onClick={this.openModal}>
              <Typography variant="h6">Schedule</Typography>
            </Button>
            <ScheduleModal
              addFlight={this.addFlight}
              open={this.state.open}
              handleClose={this.closeModal}
            />
            {/* <ScheduleForm addFlight={this.addFlight} /> */}
            <ScheduleTable
              flights={flights}
              deleteFlight={this.deleteFlight}
              editFlight={this.editFlight}
            />
          </MuiPickersUtilsProvider>
        </Container>
      </div>
    );
  }
}

export default SchedulePage;
