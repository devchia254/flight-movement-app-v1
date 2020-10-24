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
    this.cancelToken.cancel("API request was cancelled");
  }

  loadAllFlights = async () => {
    try {
      // Fetch response from API
      const response = await AuthSchedule.allFlights(this.cancelToken);
      // Manipulate response to useful data
      const data = await response.data.flightData.map((flight) => {
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
      this.setState((prevState) => {
        const fetchedflights = [...prevState.flights, ...data];
        return { flights: fetchedflights };
      });
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

  createFlight = (scheduleformData) => {
    const postData = {
      ...scheduleformData,
      userEmail: AuthService.getUserEmail(),
    };

    // console.log("postData: ", postData);

    AuthSchedule.createFlight(postData)
      .then((res) => {
        // console.log(res.data);
        this.snackbarSuccess(res.data.message);

        // Optimistic UI Update: Create flight
        this.setState((prevState) => {
          const addFlight = {
            flightId: res.data.flight_id,
            ...postData,
            createdAt: moment().format(),
            updatedAt: moment().format(),
            updatedBy: "",
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
  editFlight = (editFormData, putDataId, resetForm) => {
    const putData = {
      ...editFormData,
      updatedBy: AuthService.getUserEmail(),
    };

    // console.log("putData: ", putData);

    AuthSchedule.editFlight(putData, putDataId)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.snackbarSuccess(res.data.message);
        }

        this.setState((prevState) => {
          const updateFlights = prevState.flights.map((flight) => {
            if (putDataId === flight.flightId) {
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
              company: "",
              acReg: "",
              destination: "",
              checkIn: null,
              etd: null,
              eta: null,
              status: "",
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

  deleteFlight = (deleteDataId, e) => {
    if (window.confirm("Are you sure?")) {
      AuthSchedule.deleteFlight(deleteDataId)
        .then((res) => {
          this.setState((prevState) => {
            const filterFlight = prevState.flights.filter(
              (flight, i, arr) => flight.flightId !== deleteDataId
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
    //   (flight, i, arr) => flight.flightId !== flightId
    // );

    // if (window.confirm("Are you sure?")) {
    //   this.setState({ flights: filterFlight });
    // }
  };

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

    console.log(this.cancelToken);

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
