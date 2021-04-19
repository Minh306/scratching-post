import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    title: {
      backgroundColor: "red",
      color: "white",
      [theme.breakpoints.down("lg")]: {
        color: "green",
      },
      [theme.breakpoints.down("sm")]: {
        color: "blue",
      },
    },
  };
});

export default useStyle;
