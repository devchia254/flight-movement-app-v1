import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import CustomTheme from "./assets/theme/CustomTheme"; //  Custom Material Theme
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // React Router
import { SnackbarProvider } from "notistack"; // Snackbar
import { ThemeProvider } from "@material-ui/core/styles"; // Mateiral UI Themes

import * as serviceWorker from "./serviceWorker";

const { appTheme } = CustomTheme;

ReactDOM.render(
  //<React.StrictMode>
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
