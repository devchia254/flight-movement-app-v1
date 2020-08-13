import React, { Component } from "react";

import makeData from "../test/makeData"; // Fake data generator
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
      flights: [...makeData(3)],
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={8}>
            <HomeTable flights={this.state.flights} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <WeatherCard />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Homepage);
