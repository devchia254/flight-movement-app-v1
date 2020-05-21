import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "./MyField.js";
import MyKBDateTimePicker from "./MyKBDateTimePicker.js";

function MyForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        flightNo: "",
        acReg: "",
        dateTime: new Date(),
        from: "",
        to: "",
        company: "",
      }}
      nextInitialState={{
        dateTime: "",
      }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        // Clear form after submit
        resetForm({
          values: {
            flightNo: "",
            acReg: "",
            dateTime: null,
            from: "",
            to: "",
            company: "",
          },
        });
      }}
    >
      {({ values, errors }) => (
        <Form>
          <div>
            <Field
              label="Date & Time"
              name="dateTime"
              component={MyKBDateTimePicker}
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
            <Field label="From" name="from" component={MyField} />
          </div>
          <div>
            <Field label="To" name="to" component={MyField} />
          </div>
          <div>
            <Field label="Company" name="company" component={MyField} />
          </div>
          <Button type="submit">submit</Button>
          <pre>{JSON.stringify({ errors, values }, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default MyForm;
