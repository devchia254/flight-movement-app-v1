import React from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // minWidth: "150px",
  },
}));

export default function Arrow(props) {
  const { direction, clickFunction } = props;
  const classes = useStyles();

  const icon =
    direction === "left" ? (
      <ArrowBackIosIcon onClick={clickFunction} />
    ) : (
      <ArrowForwardIosIcon onClick={clickFunction} />
    );

  return <div className={classes.arrow}>{icon}</div>;
}
