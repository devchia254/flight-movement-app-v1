import React from "react";
// Material UI
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Modal Styling
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
}));

export default function FourOhFour(props) {
  const classes = useStyles();

  const { location } = props;

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h1" gutterBottom>
        PAGE 404
      </Typography>
      <Typography variant="h6" gutterBottom>
        This route is not available: "{location.pathname}"
      </Typography>
    </Container>
  );
}
