import React, { Component } from "react";

import HomepageTable from "../components/table/HomepageTable";
import WeatherCard from "../components/weather/WeatherCard";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
  flightsTable: {
    height: "100%",
    // marginBottom: theme.spacing(2),
  },
});

class Homepage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;
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
            <HomepageTable />
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
