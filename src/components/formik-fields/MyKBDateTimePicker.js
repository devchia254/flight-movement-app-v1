import React from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const MyKBDateTimePicker = ({ form, field, ...props }) => {
  const currentError = form.errors[field.name];
  const errorMsg = currentError !== "Required" ? "" : currentError; // Displays only "required" method from Yup

  return (
    <KeyboardDateTimePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy HH:mm"
      helperText={errorMsg}
      error={Boolean(currentError)}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={(value) => form.setFieldValue(field.name, value, true)}
      {...props}
    />
  );
};
export default MyKBDateTimePicker;
