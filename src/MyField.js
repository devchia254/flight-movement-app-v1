import React from "react";
import { TextField } from "@material-ui/core";

export default function MyField({ label, placeholder, field }) {
  // console.log({ ...field });
  return <TextField label={label} placeholder={placeholder} {...field} />;
}
