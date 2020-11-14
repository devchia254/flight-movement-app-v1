import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  arrow: {
    width: "100%",
    height: "100%",
    minWidth: "50px", // Prevents arrows from exceeding window
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Arrow(props) {
  const { direction, clickFunction } = props;
  const classes = useStyles();

  const icon =
    direction === "left" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />;

  return (
    <div className={classes.arrow}>
      <IconButton fontSize="small" onClick={clickFunction}>
        {icon}
      </IconButton>
    </div>
  );
}
