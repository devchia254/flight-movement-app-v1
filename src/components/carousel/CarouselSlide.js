import React from "react";
import { Card, makeStyles } from "@material-ui/core";

export default function CarouselSlide(props) {
  // const { backgroundColor, component } = props.content;
  const { component } = props.content;

  const useStyles = makeStyles((theme) => ({
    card: {
      // backgroundColor: "salmon",
      padding: theme.spacing(1),
      borderRadius: 0,
      // paddingTop: theme.spacing(2),
      minHeight: "90vh",
      // height: "90vh",
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
    <Card elevation={0} className={classes.card}>
      <div className={classes.slideComponent}>{component}</div>
    </Card>
  );
}
