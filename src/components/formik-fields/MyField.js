import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// Formik
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  field: {},
}));

// Can be used for String / Passwords (specify type from form page)
const MyField = ({ label, type, ...props }) => {
  const classes = useStyles();

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : null;

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
