import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { Route, Link } from "react-router-dom";

// import Ping from "./Ping";

const discoveryPageStyle = theme => ({
  container: {
<<<<<<< HEAD
    margin: theme.spacing(2)
=======
    margin: theme.spacing.unit * 2
>>>>>>> b4a4251c137e37d00bdb881a364f5ad740cf8574
  }
});

class DiscoverPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography>Discovery Page Placeholder</Typography>
      </div>
    );
  }
}

export default withStyles(discoveryPageStyle)(DiscoverPage);
