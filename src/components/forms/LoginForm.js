import React from "react";
import { withRouter } from "react-router-dom";

import AuthService from "../../services/auth-service";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import MyField from "../formik-fields/MyField.js";
import * as yup from "yup";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

const yupPwdRules = yup
  .string()
  .required("Required")
  .min(5, "Must not be less 8 characters");

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  email: yupStringRules,
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
  const { history } = props;
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        AuthService.login(values.email, values.password).then(
          () => {
            setSubmitting(false); // Enables submit button once submitted
            history.push("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            if (resMessage) {
              console.log(resMessage);
            }
            // this.setState({
            //   loading: false,
            //   message: resMessage,
            // });
          }
        );

        // // setTimeout to mimic fetch POST data
        // setTimeout(() => {
        //   alert(JSON.stringify(values));
        //   // Clear form after submit
        //   resetForm({
        //     values: {
        //       username: "",
        //       password: "",
        //     },
        //   });
        //   setSubmitting(false); // Enables submit button once submitted
        // }, 1500); // 3 secs timeout

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

export default withRouter(LoginForm);
