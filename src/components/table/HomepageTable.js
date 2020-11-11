import React, { Component } from "react";
import FlightsTable from "./FlightsTable";
// Auth Requests
import AuthPublic from "../../services/auth/auth-public";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
// Other dependencies
import axios from "axios";
import moment from "moment"; // require Moment library

const useStyles = (theme) => ({
  homepageTitle: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(2, 0),
  },
  dateNav: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1, 0),
  },
  flightsTable: {},
  importantNotes: {
    marginTop: theme.spacing(1),
  },
});

class Homepage extends Component {
  // Cancel XHR Requests (axios) when component unmounts abruptly
  cancelToken = axios.CancelToken.source();

  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      date: moment().format("YYYY-MM-DD"),
      minDays: -3,
      maxDays: 3,
      clicks: 0,
      disablePrevBtn: false,
      disableFollowingBtn: false,
      isLoading: false,
      // minutes: 0, // Testing interval only
    };

    this.fetchPublicFlights = this.fetchPublicFlights.bind(this);
    this.previousDates = this.previousDates.bind(this);
    this.followingDates = this.followingDates.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // Fetch flights after the first mount of Homepage component
    this.fetchPublicFlights();

    // Set interval to fetch public flights every 5 minutes
    this.flightsTimer = setInterval(() => {
      // this.testingInterval(); // Testing interval
      this.fetchPublicFlights();
    }, 300000);
  }

  // // Testing only
  // testingInterval = () => {
  //   this.setState((prevState) => {
  //     return { minutes: prevState.minutes + 5 };
  //   });
  //   console.log(
  //     `Flight fetches: ${this.state.minutes / 5}, Minutes passed: ${
  //       this.state.minutes
  //     }`
  //   );
  // };

  componentWillUnmount() {
    // Clear timer when removed from DOM
    clearInterval(this.flightsTimer);
    this.cancelToken.cancel("API request was interrupted and cancelled");
  }

  async fetchPublicFlights() {
    try {
      // Fetch response from API
      const response = await AuthPublic.publicFlights(this.cancelToken);
      // Map response into useful data
      const publicFlightData = await response.data.flightData.map((flight) => {
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
        } = flight;

        return {
          flightId: flight_id,
          flightNo: flight_no,
          company: company,
          acReg: ac_reg,
          destination: destination,
          flightDate: moment(check_in, true).format("YYYY-MM-DD"), // Accepted ISO 8601 string for Calendar Date and new field to manipulate date in homepage
          checkIn: moment(check_in, true).format("HH:mm"),
          etd: moment(etd, true).format("HH:mm"),
          eta: moment(eta, true).format("HH:mm"),
          status: status,
        };
      });

      // Set data into flights from the state
      this.setState({ flights: publicFlightData });

      // Show loading spinner prior to displaying flights
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        console.log("Error with fetching public flights: ", resMessage);
      }
    }
  }

  // See previous dates (-3 days)
  previousDates() {
    const { clicks, minDays } = this.state;

    if (clicks > minDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks - 1,
          date: moment()
            .add(prevState.clicks - 1, "d")
            .format("YYYY-MM-DD", true),
          disableFollowingBtn: false,
          disablePrevBtn:
            prevState.clicks - 1 === prevState.minDays ? true : false,
        };
      });
    }
  }

  // See following dates (+3 days)
  followingDates() {
    const { clicks, maxDays } = this.state;

    if (clicks < maxDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks + 1,
          date: moment()
            .add(prevState.clicks + 1, "d")
            .format("YYYY-MM-DD", true),
          disablePrevBtn: false,
          disableFollowingBtn:
            prevState.clicks + 1 === prevState.maxDays ? true : false,
        };
      });
    }
  }

  render() {
    const { classes } = this.props;

    // Filter flights based on the date and pass it to FlightsTable
    const filteredFlights = this.state.flights.filter((flight) => {
      return flight.flightDate === this.state.date;
    });

    return (
      <React.Fragment>
        {/* <pre>{JSON.stringify(displayState, null, 2)}</pre> */}
        <Hidden xsDown>
          <div className={classes.homepageTitle}>
            <Typography variant="h3">Flight Schedule</Typography>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={classes.homepageTitle}>
            <Typography variant="h4">Flight Schedule</Typography>
          </div>
        </Hidden>
        <div className={classes.dateNav}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            name="minusOneDay"
            onClick={this.previousDates}
            disabled={this.state.disablePrevBtn}
          >
            Previous
          </Button>
          {/* Hidden when BELOW 600px for Date Header - Start*/}
          <Hidden xsDown>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {/* Full Date format */}
              {moment(this.state.date).format("dddd Do MMMM YYYY")}
            </Typography>
          </Hidden>
          {/* Hidden when BELOW 600px for Date Header - End*/}
          {/* Hidden when 600px and ABOVE for Date Header - Start*/}
          <Hidden smUp>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              {/* Full Date format */}
              {moment(this.state.date).format("dddd Do MMMM YYYY")}
            </Typography>
          </Hidden>
          {/* Hidden when 600px and ABOVE for Date Header - End*/}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            name="plusOneDay"
            onClick={this.followingDates}
            disabled={this.state.disableFollowingBtn}
          >
            Next
          </Button>
        </div>
        <div className={classes.flightsTable}>
          <FlightsTable
            tableFlights={filteredFlights}
            isLoading={this.state.isLoading}
          />
        </div>
        <div className={classes.importantNotes}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Important Notes before Boarding
              </Typography>
              <ul style={{ margin: 0 }}>
                <li>
                  <Typography variant="body1">
                    Check-in counter is open 1 hour before departure
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Declare any dangerous goods
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Thank you for not smoking in the terminal (Observe for
                    designated Smoking Area)
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Homepage);
