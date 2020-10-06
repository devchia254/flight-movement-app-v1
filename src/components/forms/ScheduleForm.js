import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

// Modal Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
  },
}));

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  dateTime: yup.date().nullable().required("Required"),
  flightNo: yupStringRules,
  acReg: yupStringRules,
  from: yupStringRules,
  to: yupStringRules,
  company: yupStringRules,
});

function ScheduleForm({ createFlight }) {
  const classes = useStyles();

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

        createFlight(values); // add flight values by lifting to state
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
        setSubmitting(false); // Enables submit button once submitted
        // // setTimeout to mimic fetch POST data
        // setTimeout(() => {}, 1500); // 3 secs timeout
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <Field
            label="Date & Time (24h)"
            name="dateTime"
            component={MyKBDateTimePicker}
          />
          <MyField label="Flight No." name="flightNo" />
          <MyField label="Aircraft Reg." name="acReg" />
          <MyField label="From" name="from" />
          <MyField label="To" name="to" />
          <MyField label="Company" name="company" />
          <Button
            disabled={props.isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            submit
          </Button>
          {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          {/* <DisplayFormikProps {...props} /> */}
        </Form>
      )}
    </Formik>
  );
}

export default ScheduleForm;
