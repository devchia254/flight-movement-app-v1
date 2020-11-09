import React, { Component } from "react";
// import { generate } from "shortid";
import AuthService from "../services/auth/auth-service";
import AuthSchedule from "../services/auth/auth-schedule";
import ScheduleModal from "../components/modals/ScheduleModal.js";
import ScheduleTable from "../components/table/ScheduleTable.js";

// import makeData from "../test/makeData"; // Fake data generator
import axios from "axios";

// Material UI
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

// Notistack SnackBars
import { withSnackbar } from "notistack";

// Material-UI Date Pickers (Moment Library)
import { MuiPickersUtilsProvider } from "@material-ui/pickers"; // Requires a Date lib to be chosen
import MomentUtils from "@date-io/moment";
const moment = require("moment"); // require Moment library

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
  // Cancel XHR Requests (axios) when component unmounts abruptly
  cancelToken = axios.CancelToken.source();

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
    this.loadAllFlights();
  }

  componentWillUnmount() {
    this.cancelToken.cancel("API request was interrupted and cancelled");
  }

  // Snackbar Success Messages
  snackbarSuccess(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "success",
    });
  }
  // Snackbar Fail Messages
  snackbarFail(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "error",
      autoHideDuration: 5000,
    });
  }

  // Schedule Modal Button functions below
  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  loadAllFlights = async () => {
    try {
      // Fetch response from API
      const response = await AuthSchedule.allFlights(this.cancelToken);
      // Manipulate response data to useful data
      const flightData = await response.data.flightData.map((flight) => {
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
          flightId: flight_id,
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
      // Set useful data to the State
      this.setState({ flights: flightData });
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        console.log("Error with fetching flights: ", resMessage);
      }
    }
  };

  createFlight = async (scheduleformData) => {
    // Combine form data and user email for POST request
    const postData = {
      ...scheduleformData,
      userEmail: AuthService.getUserEmail(),
    };

    try {
      // Fetch response from API
      const response = await AuthSchedule.createFlight(
        postData,
        this.cancelToken
      );

      // Response data deliver success message
      this.snackbarSuccess(response.data.message);

      // Optimistic UI Update: Create flight
      this.setState((prevState) => {
        const addFlight = {
          flightId: response.data.flight_id,
          ...postData,
          createdAt: moment().format(),
          updatedAt: moment().format(),
          updatedBy: "",
        };

        return {
          flights: [...prevState.flights, addFlight],
        };
      });

      // Finally close modal
      this.closeModal();
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        this.snackbarFail(resMessage);
      }
    }
  };

  // Edit Product
  editFlight = async (editFormData, putDataId, resetForm) => {
    // Combine edited form data and user email for PUT request
    const putData = {
      ...editFormData,
      updatedBy: AuthService.getUserEmail(),
    };

    try {
      // Fetch response from API
      const response = await AuthSchedule.editFlight(
        putData,
        putDataId,
        this.cancelToken
      );

      if (response.status === 200) {
        this.snackbarSuccess(response.data.message);
        // Clear form after submit (Formik)
        resetForm({
          values: {
            flightNo: "",
            company: "",
            acReg: "",
            destination: "",
            checkIn: null,
            etd: null,
            eta: null,
            status: "",
          },
        });
      }

      // Optimistic UI Update: Edit Flight
      this.setState((prevState) => {
        const updateFlights = prevState.flights.map((flight) => {
          // Match the IDs between the flight edited from form (putData) with the flight stored in the state
          if (putDataId === flight.flightId) {
            // Manipulated putData to be added into state
            const updateFlightProps = {
              ...putData,
              updatedAt: moment().format(), // Now() in ISO 8601 format
            };

            return {
              ...flight, // Flight from state with matched ID
              ...updateFlightProps, // Assign new putData values with the matched flight from state
            };
          }
          return flight; // Return rest of the flights
        });

        // Return the updated flights into the state
        return { flights: updateFlights };
      });
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        this.snackbarFail(resMessage);
      }
    }
  };

  deleteFlight = async (deleteDataId) => {
    // Warning dialog before deleting flight
    if (window.confirm("Are you sure?")) {
      try {
        // Fetch response from API
        const response = await AuthSchedule.deleteFlight(
          deleteDataId,
          this.cancelToken
        );

        // Optimistic UI update: Delete Flight
        this.setState((prevState) => {
          const filterFlight = prevState.flights.filter(
            (flight, i, arr) => flight.flightId !== deleteDataId // Return flights where the flight ID from state does not match with the flight ID from the Schedule table
          );
          return { flights: filterFlight };
        });

        this.snackbarSuccess(response.data.message);
      } catch (error) {
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        if (axios.isCancel(error)) {
          console.log("Axios: ", error.message);
        } else if (resMessage) {
          this.snackbarFail(resMessage);
        }
      }
    }
  };

  render() {
    const { flights } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Container>
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
