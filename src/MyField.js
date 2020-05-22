import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const MyField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  // console.log(meta.);
  return (
    <TextField
      {...field}
      label={label}
      helperText={errorText}
      error={Boolean(errorText)} //Helps turn the helperText to red
    />
  );
};

export default MyField;
