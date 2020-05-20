import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "./MyField.js";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

//PROBLEM: Label covers the date and time selected. Also - "TypeError: can't access property "length", stateValue is undefined"
const FormikDatePicker = ({ form, field, ...other }) => {
  // console.log("field: ", field);
  const currentError = form.errors[field.name];

  console.log(currentError);
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

function MyForm({ onSubmit }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          flightNo: "",
          acReg: "",
          dateTime: new Date(),
          from: "",
          to: "",
          company: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div>
              <Field
                label="Date"
                name="dateTime"
                component={FormikDatePicker}
              />
            </div>
            <div>
              <Field
                label="Flight No."
                name="flightNo"
                id="jjbkjb"
                component={MyField}
              />
            </div>
            <div>
              <Field label="Aircraft Reg." name="acReg" component={MyField} />
            </div>
            {/* <div>
              <Field label="Time" name="time" component={MyField} />
            </div> */}
            <div>
              <Field label="From" name="from" component={MyField} />
            </div>
            <div>
              <Field label="To" name="to" component={MyField} />
            </div>
            <div>
              <Field label="Company" name="company" component={MyField} />
            </div>
            <Button type="submit">submit</Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            <pre>{JSON.stringify({ errors, values }, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}

export default MyForm;
