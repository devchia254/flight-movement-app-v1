import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import MyField from "../formik-fields/MyField.js";
import * as yup from "yup";

// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

const yupPwdRules = yup
  .string()
  .required("Required")
  .min(3, "Must not be less 3 characters (CHANGE LATER!)");

const yupEmailRules = yup
  .string()
  .required("Required")
  .email("Must be a valid email");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  email: yupEmailRules,
  password: yupPwdRules,
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

function LoginForm(props) {
  const classes = useStyles();
  const { loginUser } = props;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button
        loginUser(values);
        setSubmitting(false);
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Email" name="email" />
          <MyField label="Password" name="password" type="password" />
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
