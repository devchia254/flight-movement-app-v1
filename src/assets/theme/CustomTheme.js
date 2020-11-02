import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-montserrat";

class CustomTheme {
  weatherTheme = createMuiTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
    },
  });
}

export default new CustomTheme();
