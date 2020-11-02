import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-montserrat";
import "typeface-quicksand";
import "typeface-nunito";

class CustomTheme {
  appTheme = createMuiTheme({
    typography: {
      fontFamily: ["Nunito"].join(","),
      h1: {
        fontFamily: "Quicksand",
      },
      h2: {
        fontFamily: "Quicksand",
      },
      h3: {
        fontFamily: "Quicksand",
        fontWeight: 500,
      },
      h4: {
        fontFamily: "Quicksand",
      },
      h5: {
        fontFamily: "Quicksand",
      },
      h6: {
        fontFamily: "Quicksand",
        fontWeight: 500,
      },
    },
  });

  weatherTheme = createMuiTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
    },
  });
}

export default new CustomTheme();
