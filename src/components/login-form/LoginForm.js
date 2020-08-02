import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import MyField from "../formik-fields/MyField.js";
import * as yup from "yup";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  username: yupStringRules,
  password: yupStringRules,
});

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(2, 2, 1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
  },
}));

function LoginForm() {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        // setTimeout to mimic fetch POST data
        setTimeout(() => {
          alert(JSON.stringify(values));
          // Clear form after submit
          resetForm({
            values: {
              username: "",
              password: "",
            },
          });
          setSubmitting(false); // Enables submit button once submitted
        }, 1500); // 3 secs timeout
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Username" name="username" />
          <MyField label="Password" name="password" />
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

export default LoginForm;
