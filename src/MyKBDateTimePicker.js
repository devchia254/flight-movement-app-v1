import React from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const MyKBDateTimePicker = ({ form, field, ...other }) => {
  // const currentError = form.errors[field.name];
  return (
    <KeyboardDateTimePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy HH:mm"
      // helperText={currentError}
      // error={Boolean(currentError)}
      // onError={(error) => {
      //   // handle as a side effect
      //   if (error !== currentError) {
      //     form.setFieldError(field.name, error);
      //   }
      // }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};
export default MyKBDateTimePicker;
