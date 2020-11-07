import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";
import { useField } from "formik";

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

const useStyles = makeStyles((theme) => ({
  field: {
    // minWidth: "150px",
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
      {roles.map((option, index) => (
        <MenuItem key={option.value} value={option.value}>
          <div>{option.label}</div>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelect;
