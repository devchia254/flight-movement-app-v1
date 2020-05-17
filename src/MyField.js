import React from "react";
import { TextField } from "@material-ui/core";

export default function MyField({ label, field, ...other }) {
  // console.log(other);
  return <TextField label={label} {...field} />;
}
