import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  field: {
    // minWidth: "150px",
  },
}));

// Can be used for String / Passwords (specify type from form page)
const MyField = ({ label, type, ...props }) => {
  const classes = useStyles();

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : null;

  // console.log("type: ", type);
  return (
    <TextField
      {...field}
      label={label}
      type={type}
      helperText={errorText}
      error={Boolean(errorText)} // Helps turn the helperText to red
      className={classes.field}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};

export default MyField;
