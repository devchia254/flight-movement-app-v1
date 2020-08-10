import React, { Component } from "react";
import { generate } from "shortid";
import makeData from "../test/makeData"; // Fake data generator

import ScheduleModal from "../components/modals/ScheduleModal.js";
import ScheduleTable from "../components/table/ScheduleTable.js";

// Material UI
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

// Material-UI Date Pickers (Moment Library)
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import MomentUtils from "@date-io/moment";
const moment = require("moment"); // require Moment library\

// Example of 1 record
// const sampleData = {
//   id: "knd26GHI87",
//   flightNo: "AN234",
//   acReg: "9M-SBO",
//   dateTime: "09/12/2020 10:00",
//   from: "Terminal 2",
//   to: "Petronas Base 3",
//   company: "Sazma",
// };

const scheduleStyles = (theme) => ({
  header: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(1),
  },
});

class SchedulePage extends Component {
  constructor() {
    super();
    this.state = {
      flights: [
        // sampleData,
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

  // Modal functions below
  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { flights } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Container fixed>
          {/* <Typography variant="h4" className={classes.header}>
            Schedule flight
          </Typography> */}
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              className={classes.button}
              onClick={this.openModal}
            >
              Schedule
              {/* <Typography variant="h6">Schedule</Typography> */}
            </Button>
            <ScheduleModal
              addFlight={this.addFlight}
              open={this.state.open}
              closeModal={this.closeModal}
            />
            <ScheduleTable
              flights={flights}
              deleteFlight={this.deleteFlight}
              editFlight={this.editFlight}
            />
          </MuiPickersUtilsProvider>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(scheduleStyles)(SchedulePage);
