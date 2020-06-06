import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function ModalForm({ flightObj }) {
  const classes = useStyles();
  console.log(flightObj);
  return (
    <Formik
      initialValues={{
        flightNo: flightObj.flightNo,
        acReg: flightObj.acReg,
        dateTime: flightObj.dateTime,
        from: flightObj.from,
        to: flightObj.to,
        company: flightObj.company,
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button
        // onSubmit(values); // Lift values to state
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
        <Form className={classes.root}>
          <Field
            label="Date & Time"
            name="dateTime"
            component={MyKBDateTimePicker}
          />
          <MyField label="Flight No." name="flightNo" />
          <MyField label="Aircraft Reg." name="acReg" />
          <MyField label="From" name="from" />
          <MyField label="To" name="to" />
          <MyField label="Company" name="company" />
          <Button disabled={props.isSubmitting} type="submit">
            submit
          </Button>
          {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          <div>
            <DisplayFormikProps {...props} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ModalForm;
