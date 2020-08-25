import React, { Component } from "react";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

const useStyles = (theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
});

class UserProfilePage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <h1> USER PROFILE PAGE HERE!</h1>
      </Container>
    );
  }
}

export default withStyles(useStyles)(UserProfilePage);
