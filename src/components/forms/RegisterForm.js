import React from "react";

import AuthService from "../../services/auth/auth-service";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import MyField from "../formik-fields/MyField.js";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

const yupEmailRules = yup
  .string()
  .required("Required")
  .email("Must be a valid email");

const yupPwdRules = yup
  .string()
  .required("Required")
  .min(8, "Must not be less 8 characters");

const yupPwdVerify = yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match");

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  firstName: yupStringRules,
  lastName: yupStringRules,
  email: yupEmailRules,
  password: yupPwdRules,
  passwordVerify: yupPwdVerify,
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

function RegisterForm(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const regError = (msg) => {
    enqueueSnackbar(msg, {
      variant: "error",
    });
  };

  const regSuccess = (msg) => {
    enqueueSnackbar(msg, {
      variant: "success",
    });
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordVerify: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        AuthService.register(
          values.firstName,
          values.lastName,
          values.email,
          values.password,
          "user"
        )
          .then((res) => {
            // console.log(res.data);
            regSuccess(res.data.message);
            resetForm({
              values: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordVerify: "",
              },
            });
            setSubmitting(false); // Enables submit button once submitted
          })
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            if (resMessage) {
              // console.log(resMessage);
              regError(resMessage);
            }

            setSubmitting(false); // Enables submit button once submitted
            // this.setState({
            //   loading: false,
            //   message: resMessage,
            // });
          });
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="First Name" name="firstName" />
          <MyField label="Last Name" name="lastName" />
          <MyField label="Email" name="email" />
          <MyField label="Password" name="password" type="password" />
          <MyField
            label="Verify Password"
            name="passwordVerify"
            type="password"
          />
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

export default RegisterForm;
