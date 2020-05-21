import React from "react";
import { TextField } from "@material-ui/core";

const MyField = ({ label, field, ...other }) => {
  // console.log(other);
  return <TextField label={label} {...field} />;
};

export default MyField;
