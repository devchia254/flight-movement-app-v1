import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Tooltip } from "@material-ui/core";
import { useField } from "formik";

const statuses = [
  {
    value: "Scheduled",
    label: "Scheduled",
    title:
      "A scheduled flight is one that is anticipated to depart and arrive according to either filed flight plans or published flight schedules.",
  },
  {
    value: "Active",
    label: "Active",
    title:
      "A flight goes to this status when we receive the actual time of a gate pushback or takeoff.",
  },
  {
    value: "Unknown",
    label: "Unknown",
    title:
      "A flight goes to this status when we cannot determine the actual arrival time (landing or gate arrival) in a reasonable amount of time. Note, this does not indicate an error or that there was any problem or incident with the flight, only that no data was available for the actual landing time.",
  },
  {
    value: "Redirected",
    label: "Redirected",
    title:
      "The flight has changed its destination to an unscheduled airport. After landing at an unscheduled airport, the state will change to Diverted.",
  },
  {
    value: "Landed",
    label: "Landed",
    title: "The flight landed at the scheduled airport.",
  },
  {
    value: "Diverted",
    label: "Diverted",
    title: "The flight landed at an unscheduled airport.",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    title: "The flight was cancelled",
  },
];

const useStyles = makeStyles((theme) => ({
  field: {
    // minWidth: "150px",
  },
}));

const customTooltip = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(14),
  },
}));

const CustomSelect = ({ label, type, ...props }) => {
  const classes = useStyles();

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : null;

  // console.log("type: ", type);
  return (
    <TextField
      {...field}
      select
      label={label}
      className={classes.field}
      helperText={errorText}
      error={Boolean(errorText)} // Helps turn the helperText to red
      variant="outlined"
      size="small"
      fullWidth
    >
      {statuses.map((option, index) => (
        <MenuItem key={option.value} value={option.value}>
          <Tooltip
            title={option.title}
            placement="top"
            arrow
            classes={customTooltip()}
          >
            <div>{option.label}</div>
          </Tooltip>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelect;
