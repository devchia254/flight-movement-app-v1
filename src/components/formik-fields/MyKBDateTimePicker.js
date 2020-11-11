import React from "react";
// Material UI Pickers
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const MyKBDateTimePicker = ({ form, field, ...props }) => {
  const currentError = form.errors[field.name];
  const errorMsg = currentError !== "Required" ? "" : currentError; // Displays only "required" method from Yup

  return (
    <KeyboardDateTimePicker
      size="small"
      inputVariant="outlined"
      fullWidth
      clearable
      disablePast
      ampm={false}
      name={field.name}
      value={field.value}
      format="DD/MM/YYYY HH:mm" // Uses Moment token format
      helperText={errorMsg}
      error={Boolean(currentError)}
      // if you are using custom validation schema you need to pass `true` as third argument for onChange
      onChange={(value) => form.setFieldValue(field.name, value, true)}
      {...props}
    />
  );
};
export default MyKBDateTimePicker;
