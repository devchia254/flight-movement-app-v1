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
            company,
            ac_reg,
            destination,
            check_in,
            etd,
            eta,
            status,
            user_email,
            createdAt,
            updatedAt,
            updated_by,
          } = flight;
          return {
            id: flight_id,
            flightNo: flight_no,
            company: company,
            acReg: ac_reg,
            destination: destination,
            checkIn: check_in,
            etd: etd,
            eta: eta,
            status: status,
            userEmail: user_email,
            createdAt: createdAt,
            updatedAt: updatedAt,
            updatedBy: updated_by,
          };
        });

        this.setState((prevState) => {
          const fetchedflights = [...prevState.flights, ...mappedFlights];
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
      dateTime: moment(dateTime).format(), // String format: ISO 8601
      from: from,
      to: to,
      company: company,
      userEmail: AuthService.getUserEmail(),
    };

    // console.log("JS Date: ", dateTime);
    // console.log("Moment with no UTC: ", moment(dateTime).format());
    // console.log("Moment with UTC: ", moment.utc(dateTime).format());

    AuthSchedule.createFlight(postData)
      .then((res) => {
        this.snackbarSuccess(res.data.message);
        this.setState((prevState) => {
          const addFlight = {
            ...postData,
            userEmail: AuthService.getUserEmail(),
            createdAt: moment().format(),
            updatedAt: moment().format(),
            updated_by: "",
          };

          return {
            flights: [...prevState.flights, addFlight],
          };
        });
        // console.log(createFlightProps)
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
  editFlight = (modalFormData, flightId, resetForm) => {
    const putData = { ...modalFormData, updatedBy: AuthService.getUserEmail() };

    AuthSchedule.editFlight(putData, flightId)
      .then((res) => {
        this.snackbarSuccess(res.data.message);

        this.setState((prevState) => {
          const updateFlights = prevState.flights.map((flight) => {
            if (flightId === flight.id) {
              // Only when the ID matches between the edited flight record and the flight in the state, updateFlightProps updates the respective properties of the flight object in the state.
              const updateFlightProps = {
                ...putData,
                updatedAt: moment().format(), // Now() in ISO 8601 format
              };

              return {
                ...flight,
                ...updateFlightProps,
              };
            }
            return flight; // Return rest of the flights
          });

          // Clear form after submit (Formik)
          resetForm({
            values: {
              flightNo: "",
              acReg: "",
              dateTime: null,
              from: "",
              to: "",
              company: "",
            },
          });

          return { flights: updateFlights };
        });
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
    // this.setState(state => {
    //   const newFlights = state.flights.map((flight, i) =)
    // })
  };

  deleteFlight = (flightId, e) => {
    if (window.confirm("Are you sure?")) {
      AuthSchedule.deleteFlight(flightId)
        .then((res) => {
          this.setState((prevState) => {
            const filterFlight = prevState.flights.filter(
              (flight, i, arr) => flight.id !== flightId
            );
            return { flights: filterFlight };
          });

          this.snackbarSuccess(res.data.message);
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
    }

    // const filterFlight = this.state.flights.filter(
    //   (flight, i, arr) => flight.id !== flightId
    // );

    // if (window.confirm("Are you sure?")) {
    //   this.setState({ flights: filterFlight });
    // }
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
