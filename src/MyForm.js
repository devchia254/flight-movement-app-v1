import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "./MyField.js";
import MyKBDateTimePicker from "./MyKBDateTimePicker.js";
import * as yup from "yup";

const yupValidationSchema = yup.object({
  flightNo: yup.string().required().max(10),
  acReg: yup.string().required().max(10),
  from: yup.string().required().max(10),
  to: yup.string().required().max(10),
  company: yup.string().required().max(10),
});

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
      validationSchema={yupValidationSchema}
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
            <MyField label="Flight No." name="flightNo" id="jjbkjb" />
            {/* <Field
              label="Flight No."
              name="flightNo"
              id="jjbkjb"
              component={MyField}
            /> */}
          </div>
          <div>
            <MyField label="Aircraft Reg." name="acReg" />
          </div>
          <div>
            <MyField label="From" name="from" />
          </div>
          <div>
            <MyField label="To" name="to" />
          </div>
          <div>
            <MyField label="Company" name="company" />
          </div>
          <Button type="submit">submit</Button>
          <pre>{JSON.stringify({ errors, values }, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default MyForm;
