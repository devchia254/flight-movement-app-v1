import React from "react";
import { Card, makeStyles } from "@material-ui/core";

export default function CarouselSlide(props) {
  const { backgroundColor, title } = props.content;

  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor,
      borderRadius: 5,
      // minHeight: "70vh",
      padding: theme.spacing(1),
      height: "90vh",
      // maxHeight: "100vh",
      // padding: "75px 50px",
      // margin: "0px 25px",
      // width: "100%",
      // boxShadow: "20px 20px 20px black",
      display: "flex",
      // justifyContent: "center",
    },

    slideComponent: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.slideComponent}>{title}</div>
    </Card>
  );
}
