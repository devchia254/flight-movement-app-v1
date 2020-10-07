import React, { Component } from "react";
// import { generate } from "shortid";
import AuthService from "../services/auth/auth-service";
import AuthSchedule from "../services/auth/auth-schedule";

// import makeData from "../test/makeData"; // Fake data generator

import ScheduleModal from "../components/modals/ScheduleModal.js";
import ScheduleTable from "../components/table/ScheduleTable.js";

// Material UI
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import { withSnackbar } from "notistack";

// Material-UI Date Pickers (Moment Library)
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import MomentUtils from "@date-io/moment";
const moment = require("moment"); // require Moment library

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
      // flights: [
      //   // ...makeData(20),
      // ]
      flights: [],
      open: false, // Trigger Dialog(modal) to be visible
    };
  }

  componentDidMount() {
    this.getFlights();
  }

  snackbarSuccess(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "success",
    });
  }

  snackbarFail(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "error",
    });
  }

  getFlights = () => {
    AuthSchedule.allFlights()
      .then((res) => {
        const mappedFlights = res.data.flightData.map((flight) => {
          const {
            flight_id,
            flight_no,
            ac_reg,
            date_time,
            from,
            to,
            company,
            user_email,
            createdAt,
            updatedAt,
            updated_by,
          } = flight;
          return {
            id: flight_id,
            flightNo: flight_no,
            acReg: ac_reg,
            dateTime: date_time,
            from: from,
            to: to,
            company: company,
            userEmail: user_email,
            createdAt: createdAt,
            updatedAt: updatedAt,
            updated_by: updated_by,
          };
        });

        this.setState((state) => {
          const fetchedflights = [...state.flights, ...mappedFlights];
          return { flights: fetchedflights };
        });
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        if (resMessage) {
          console.log("Error with fetching flights: ", resMessage);
        }
      });
  };

  createFlight = (formData) => {
    const { flightNo, acReg, dateTime, from, to, company } = formData;

    const postData = {
      flightNo: flightNo,
      acReg: acReg,
      dateTime: moment.utc(dateTime).format(), // String format: ISO 8601
      from: from,
      to: to,
      company: company,
      email: AuthService.getUserEmail(),
    };

    console.log("JS Date: ", dateTime);
    console.log("Moment with no UTC: ", moment(dateTime).format());
    console.log("Moment with UTC: ", moment.utc(dateTime).format());

    AuthSchedule.createFlight(postData)
      .then((res) => {
        this.snackbarSuccess(res.data.message);
        this.getFlights(); // Fetch flights after creating flight was a success
        this.closeModal();
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        if (resMessage) {
          this.snackbarFail(resMessage);
        }
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
              createFlight={this.createFlight}
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

export default withSnackbar(withStyles(scheduleStyles)(SchedulePage));
