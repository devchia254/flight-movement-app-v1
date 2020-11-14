import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

export default function CarouselSlide(props) {
  const { component } = props.content;

  const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(1),
      borderRadius: 0,
      minHeight: "90vh",
      display: "flex",
      justifyContent: "center",
    },

    slideComponent: {
      minWidth: "80%",
    },
  }));

  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.card}>
      <div className={classes.slideComponent}>{component}</div>
    </Card>
  );
}
