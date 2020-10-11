import React, { Component } from "react";

import AuthPublic from "../services/auth/auth-public";

// import makeData from "../test/makeData"; // Fake data generator
import HomeTable from "../components/table/HomeTable";
import WeatherCard from "../components/weather/WeatherCard";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = (theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
});

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
    };
  }

  componentDidMount() {
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

  render() {
    const { classes } = this.props;

    console.log(this.state.flights);
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={8}>
            <HomeTable flights={this.state.flights} />
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
