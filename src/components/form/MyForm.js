import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import * as yup from "yup";
// import { DisplayFormikProps } from "./DisplayFormikProps.js";

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

const yupValidationSchema = yup.object().shape({
  dateTime: yup.date().nullable().required("Required"),
  flightNo: yupStringRules,
  acReg: yupStringRules,
  from: yupStringRules,
  to: yupStringRules,
  company: yupStringRules,
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
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button
        onSubmit(values); // Lift values to state
        setSubmitting(false); // Enables submit button once submitted

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
      {(props) => (
        <Form>
          <div>
            <Field
              label="Date & Time"
              name="dateTime"
              component={MyKBDateTimePicker}
            />
          </div>
          <div>
            <MyField label="Flight No." name="flightNo" />
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
          <Button disabled={props.isSubmitting} type="submit">
            submit
          </Button>
          {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          {/* <DisplayFormikProps {...props} /> */}
        </Form>
      )}
    </Formik>
  );
}

export default MyForm;
