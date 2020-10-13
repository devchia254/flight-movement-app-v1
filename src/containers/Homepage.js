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
  title: {
    display: "flex",
    justifyContent: "space-between",
    // flexDirection: "column",
  },
});

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
      date: moment().format("DD-MM-YYYY", true),
      minDays: -3,
      maxDays: 3,
      clicks: 0,
      disablePrevBtn: false,
      disableNextBtn: false,
    };
  }

  componentDidMount() {
    this.fetchPublicFlights();
  }

  componentDidUpdate(prevProps, prevState) {
    this.filterFlights();
  }

  filterFlights = () => {
    const filteredFlights = this.state.flights.filter((flight) => {
      return flight.date === this.state.date;
    });
    return filteredFlights;
  };

  fetchPublicFlights() {
    AuthPublic.publicFlights()
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
          } = flight;
          return {
            id: flight_id,
            flightNo: flight_no,
            acReg: ac_reg,
            date: moment(date_time, true).format("DD-MM-YYYY"),
            time: moment(date_time, true).format("HH:mm"),
            from: from,
            to: to,
            company: company,
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

  // showFlight = (date) => {
  //   if (this.state.flights) {
  //     const filteredFlights = this.state.flights.filter((flight) => {
  //       return flight.date === date;
  //     });
  //     // return filteredFlights;
  //     this.setState({ tableFlights: filteredFlights });
  //   }
  // };

  daysBefore = () => {
    const { clicks, minDays } = this.state;
    if (clicks > minDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks - 1,
          date: moment()
            .add(prevState.clicks - 1, "d")
            .format("DD-MM-YYYY", true),
          disableNextBtn: false,
        };
      });
    } else {
      return this.setState({ disablePrevBtn: true });
    }
  };

  daysAfter = () => {
    const { clicks, maxDays } = this.state;

    if (clicks < maxDays) {
      this.setState((prevState) => {
        return {
          clicks: prevState.clicks + 1,
          date: moment()
            .add(prevState.clicks + 1, "d")
            .format("DD-MM-YYYY", true),
          disablePrevBtn: false,
        };
      });
    } else {
      this.setState({ disableNextBtn: true });
    }
  };

  render() {
    const { classes } = this.props;

    // const today = moment().format("DD/MM/YYYY");

    // this.showFlight(today);

    const displayState = {
      date: this.state.date,
      minDays: this.state.minDays,
      maxDays: this.state.maxDays,
      clicks: this.state.clicks,
      disable: this.state.disable,
    };
    // console.log(this.filterFlights);
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={8}>
            <pre>{JSON.stringify(displayState, null, 2)}</pre>
            <div className={classes.title}>
              <Button
                variant="outlined"
                color="primary"
                name="minusOneDay"
                onClick={this.daysBefore}
                disabled={this.state.disablePrevBtn}
              >
                Previous Date
              </Button>
              <Typography variant="h5">{this.state.date}</Typography>
              <Button
                variant="outlined"
                color="primary"
                name="plusOneDay"
                onClick={this.daysAfter}
                disabled={this.state.disableNextBtn}
              >
                Following Date
              </Button>
            </div>
            <HomeTable flights={this.filterFlights()} />
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
