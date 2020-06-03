import React from "react";
import Grid from "@material-ui/core/Grid";

// Debugging Formik Props
export const DisplayFormikProps = ({ values, errors, touched }) => (
  <Grid container>
    <Grid item xs></Grid>
    <Grid item xs>
      <div style={{ margin: "1rem 0", textAlign: "justify" }}>
        {/* <h3 style={{ fontFamily: "monospace" }} /> */}
        <pre
          style={{
            background: "lightgray",
            fontSize: ".65rem",
            padding: ".5rem",
          }}
        >
          <strong>props</strong> ={" "}
          {JSON.stringify({ errors, touched, values }, null, 2)}
        </pre>
      </div>
    </Grid>
    <Grid item xs></Grid>
  </Grid>
);
