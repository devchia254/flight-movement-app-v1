import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const imageStyles = makeStyles((theme) => ({
  imageSlide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    marginTop: theme.spacing(1),
    width: "100%",
    maxWidth: "100%",
    maxHeight: "70vh",
    // height,
  },
}));

export default function Image(props) {
  const { file, title } = props;
  // const { title } = props.content;

  // console.log(props);
  const classes = imageStyles();
  return (
    <React.Fragment>
      <div className={classes.imageSlide}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <img src={file} alt="Something here" className={classes.image}></img>
      </div>
    </React.Fragment>
  );
}
