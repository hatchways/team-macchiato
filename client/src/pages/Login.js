import React, { Component } from 'react'

import { Typography, Box, Grid, Button, AppBar, Toolbar, Hidden } from "@material-ui/core"
import { FormControl, FormGroup, FormControlLabel, OutlinedInput, Input, InputLabel as label } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Image from '../assets/images/login-photo.png'

const loginPageStyle = theme => ({
   imageWrapper: {
      backgroundSize: '100%',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      minHeight: '600px',
      height: '100vh',
      overflow: 'hidden',
   },
   image: { width: '100%' },
   loginWrapper: { minHeight: '600px', },
   toolBar: { background: 'white', boxShadow: 'none' }, // Used to wrap the signUp Button
   toSignUpButton: {
      top: theme.spacing(5),
      right: theme.spacing(5),
      left: 'auto',
      position: 'absolute',
   },
   loginContent: {
      maxWidth: '50%',
      marginLeft: '20%',
      marginTop: '10%',
      flex: '1 1 auto',
      overflow: 'auto',
   },
   logInHeader: { fontSize: 38, marginBottom: theme.spacing(5), },
   formControl: {
      marginBottom: theme.spacing(3),
      display: 'flex',
   },
   label: { marginBottom: theme.spacing(1) },
   loginButton: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5),
   },
});

class LoginPage extends Component {
   state = {
      email: '',
      password: '',
   }

   handleChange(event) {               // Bind to text inputs to update state
      const { id, value } = event.target
      this.setState({
         [id]: value
      })
   }
   handleSubmit(event) {
      event.preventDefault()
      console.log(this.state)
   }
   render() {
      const { classes } = this.props;
      return (
         <Typography>
            <Grid container className={classes.loginContainer} p={0}>
               <Grid item className={classes.imageWrapper} lg={5}>
                  <Hidden lgDown>
                     <img className={classes.image} src={Image} alt='login-photo' />
                  </Hidden>
               </Grid>
               <Grid item className={classes.loginWrapper} xs={12} lg={7}>
                  <Toolbar className={classes.toolBar}>
                     <div className={classes.toSignUpButton}>
                        <Link to="/signup">Sign Up</Link>
                     </div>
                  </Toolbar>
                  <div className={classes.loginContent}>
                     <Box className={classes.logInHeader}>
                        Log In
                  </Box>
                     <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="email" >Email Address</label>
                           <OutlinedInput className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password" >Password</label>
                           <OutlinedInput className={classes.input}
                              id="password" type="password" autoComplete="current-password"
                              margin="normal"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                        </FormControl>
                        <Typography>
                           <a>Forget password?</a>
                        </Typography>
                        <div >
                           <Button type="submit" name="login" className={classes.loginButton}>Log In</Button>
                        </div>
                     </form>
                  </div>
               </Grid>
            </Grid>
         </Typography>
      )
   }
}

export default withStyles(loginPageStyle)(LoginPage);