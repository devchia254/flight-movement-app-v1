import React, { Component } from "react";

import AuthPublic from "../services/auth/auth-public";

// import makeData from "../test/makeData"; // Fake data generator
import HomeTable from "../components/table/HomeTable";
import WeatherCard from "../components/weather/WeatherCard";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const moment = require("moment"); // require Moment library

const useStyles = (theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  homepageLeft: {
    padding: theme.spacing(1),
    // Height: "800px",
    // display: "grid",
    // gridTemplateRows: "1fr 2fr",
  },
  dateNav: {
    // height: "200px",
    display: "flex",
    justifyContent: "space-between",
    margin: "2em 0 2em",
    // flexDirection: "column",
  },
  homeTable: {
    height: "100%",
  },
});

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
      date: moment().format("YYYY-MM-DD"),
      minDays: -3,
      maxDays: 3,
      clicks: 0,
      disablePrevBtn: false,
      disableFollowingBtn: false,
    };
  }

  componentDidMount() {
    this.fetchPublicFlights();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.flights) {
      this.flightsByDate();
    }
  }

  flightsByDate = () => {
    const filteredFlights = this.state.flights.filter((flight) => {
      return flight.flightDate === this.state.date;
    });
    return filteredFlights;

    // if (filteredFlights.length === 0) {
    //   return null;
    // } else return filteredFlights;
  };

  fetchPublicFlights() {
    AuthPublic.publicFlights()
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
          } = flight;

          // console.log(moment(date_time));

          return {
            id: flight_id,
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
          console.log("Error with fetching public flights: ", resMessage);
        }
      });
  }

  previousDates = () => {
    const { clicks, minDays } = this.state;
    if (clicks > minDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks - 1,
          date: moment()
            .add(prevState.clicks - 1, "d")
            .format("YYYY-MM-DD", true),
          disableFollowingBtn: false,
        };
      });
    } else {
      return this.setState({ disablePrevBtn: true });
    }
  };

  followingDates = () => {
    const { clicks, maxDays } = this.state;

    if (clicks < maxDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks + 1,
          date: moment()
            .add(prevState.clicks + 1, "d")
            .format("YYYY-MM-DD", true),
          disablePrevBtn: false,
        };
      });
    } else {
      this.setState({ disableFollowingBtn: true });
    }
  };

  render() {
    const { classes } = this.props;

    // const today = moment().format("DD/MM/YYYY");
    // console.log(moment()._d);
    // console.log(moment().add(3, "d")._d);

    // const displayState = {
    //   date: this.state.date,
    //   minDays: this.state.minDays,
    //   maxDays: this.state.maxDays,
    //   clicks: this.state.clicks,
    //   disable: this.state.disable,
    // };
    // console.log(this.flightsByDate());
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} className={classes.container}>
          <Grid
            item
            // spacing={2}
            xs={12}
            sm={8}
            className={classes.homepageLeft}
          >
            {/* <pre>{JSON.stringify(displayState, null, 2)}</pre> */}
            <div className={classes.dateNav}>
              <Button
                variant="outlined"
                color="primary"
                name="minusOneDay"
                onClick={this.previousDates}
                disabled={this.state.disablePrevBtn}
              >
                Previous Date
              </Button>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                {/* Full Date format */}
                {moment(this.state.date).format("dddd Do MMMM YYYY")}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                name="plusOneDay"
                onClick={this.followingDates}
                disabled={this.state.disableFollowingBtn}
              >
                Following Date
              </Button>
            </div>
            <div className={classes.homeTable}>
              <HomeTable tableFlights={this.flightsByDate()} />
            </div>
            {/* <HomeTable tableFlights={this.state.flights} /> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={10}>
              <WeatherCard />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Homepage);
