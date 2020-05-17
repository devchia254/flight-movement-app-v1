import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "./MyField.js";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

//PROBLEM: Label covers the date and time selected. Also - "TypeError: can't access property "length", stateValue is undefined"
const FormikKeyboardDateTimePicker = ({ form, field, ...rest }) => {
  // console.log("field: ", field);
  return (
    <KeyboardDateTimePicker
      variant="inline"
      name={field.name}
      label="Date & Time"
      format="dd/MM/yyyy HH:mm"
      placeholder="10/10/2018"
      // handle clearing outside => pass plain array if you are not controlling value outside
      onChange={(dateTime) => {
        console.log("setting value to", dateTime);
        form.setFieldValue(field.name, dateTime, false);
      }}
      value={field.value}
      animateYearScrolling={false}
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
          date: "",
          time: "",
          from: "",
          to: "",
          company: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <Field
                label="Date"
                name="date"
                component={FormikKeyboardDateTimePicker}
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
            <div>
              <Field label="Time" name="time" component={MyField} />
            </div>
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
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}

export default MyForm;
