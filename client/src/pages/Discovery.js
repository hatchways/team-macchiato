import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

// Icon?
import { mdiAccount } from "@mdi/js";

const useStyles = makeStyles(theme => ({
  // Do this Wrapper stuff for now till we have more content on the page
  wrapper: {
    margin: "100px"
  },
  root: {
    padding: theme.spacing(3, 2),
    width: "75%",
    margin: "auto",
    height: "500px",
    padding: "0",
    boxShadow: "5px 5px 5px 5px rgba(157, 157, 157, 0.5)"
  },
  form_container: {
    width: "75%"
  },
  flex: {
    display: "flex",
    height: "75px"
    // borderBottom: "1px solid rgba(157, 157, 157, 0.5)"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  search_container: {
    width: "70%",
    borderRight: "1px solid rgba(157, 157, 157, 0.5)",
    display: "flex",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: "white",
    border: "none",
    boxShadow: "none",
    width: "100%"
  },
  filter: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  magic: {
    borderTop: "1px solid rgba(157, 157, 157, 0.5)"
  }
}));

export default function Discovery() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <div className={classes.flex}>
          <div className={classes.search_container}>
            <div className={classes.textField}>
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon color="red" />
              </IconButton>
              <InputBase className={classes.input} placeholder="UI / UX" />
              <Divider className={classes.divider} orientation="vertical" />
            </div>
          </div>
          <div className={classes.filter}>
            <div>
              <Typography variant="h6" component="h6">
                Filter
                <i class="fas fa-pastafarianism" />
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.magic}>
          <Typography variant="h5" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your
            application.
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
