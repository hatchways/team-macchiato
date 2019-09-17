import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { Route, Link } from "react-router-dom";

// import Ping from "./Ping";

import DisplayProject from '../components/DisplayProjectComponent'

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing(2)
  }
});

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Typography>Landing Page</Typography>
        <DisplayProject />
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
