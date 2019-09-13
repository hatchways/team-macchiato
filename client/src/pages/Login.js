import React, { Component } from 'react'

import { Typography, Box, Grid, Toolbar } from "@material-ui/core"
// import { Hidden } from "@material-ui/core"
import { FormControl, FormHelperText, OutlinedInput } from "@material-ui/core"
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

import { formsPageStyle } from '../styles/formsStyles'
import Button from '../components/ButtonComponents'
import { LinkButton } from '../components/ButtonComponents'

import { userService } from '../services/userServices'

class LoginPage extends Component {
   constructor(props) {
      super(props)
      this.state = {
         email: '',
         password: '',
         emailErrorText: '',
         passwordErrorText: '',
         formSubmitted: false,
      }
      this.forgotPassword = this.forgotPassword.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleValidation = this.handleValidation.bind(this)
      this.openSnackbar = this.openSnackbar.bind(this)
      this.closeSnackbar = this.closeSnackbar.bind(this)
   }
   forgotPassword() {
      // Do Something
      console.log("Forgot password Clicked")
      this.setState({})
   }
   // Snackbar
   openSnackbar() { this.setState({ open: true }) }
   closeSnackbar(event, reason) {
      if (reason === 'clickaway') {
         return;
      }

      this.setState({ open: false });
   }
   handleChange(event) {
      const { id, value } = event.target
      this.setState({
         [id]: value,
      })
   }
   handleSubmit(event) {
      event.preventDefault()
      this.setState({ formSubmitted: true })
      // 
      // TODO: Change so login implements Redux (Maybe)
      //
      if (this.handleValidation()) {
         let { email, password } = this.state
         userService.login(email, password)
            .then(data => {
               // Update App state
               console.log(this.props.updateAuthenticationStatus(true))
               // Redirect to profile page
               this.props.history.push(`/profile/${data.user.id}`)
            })
            .catch(err => {
               console.log(err)
               this.openSnackbar();
            })
      }
   }
   handleValidation() {
      const notNull = (val) => val && val.length;
      const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

      const errors = {
         emailErrorText: '',
         passwordErrorText: '',
      };

      let { email, password } = this.state

      // Validate email
      if (!notNull(email)) errors.emailErrorText = 'this field is required'
      else if (!validEmail(email)) errors.emailErrorText = 'invalid email'

      // Validate password
      if (!notNull(password)) errors.passwordErrorText = 'this field is required'

      // Set error messages
      this.setState({
         emailErrorText: errors.emailErrorText,
         passwordErrorText: errors.passwordErrorText,
      })

      return errors.emailErrorText === '' &&
         errors.passwordErrorText === ''
   }
   render() {
      const { classes } = this.props;
      let { emailErrorText, passwordErrorText } = this.state

      return (
         <div>
            <Snackbar className={classes.snackbar}
               anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
               open={this.state.open} onClose={this.closeSnackbar} autoHideDuration={6000}
               message={<span>Incorrect email or password</span>}
               action={[
                  <IconButton
                     key="close" aria-label="close"
                     // color="inherit"
                     className={classes.close}
                     onClick={this.closeSnackbar} >
                     <CloseIcon />
                  </IconButton>,
               ]} />
            <Grid container p={0}>
               <Grid item className={classes.imageWrapper} md={5}>
                  {/* <Hidden lgDown>
                     <img className={classes.image} src={Image} alt='login-photo' />
                  </Hidden> */}
               </Grid>
               <Grid item className={classes.contentWrapper} xs={12} md={7}>
                  <Toolbar className={classes.toolBar}>
                     <div className={classes.grow} />
<<<<<<< HEAD
                     <LinkButton to="/signup" buttonInner="Sign Up" />
=======
                     <LinkButton to="/signup" text="Sign Up" />
>>>>>>> b4a4251c137e37d00bdb881a364f5ad740cf8574
                  </Toolbar>
                  <div className={classes.content}>
                     <Typography className={classes.header}>
                        Log In
<<<<<<< HEAD
                     </Typography>
=======
                     </Box>
>>>>>>> b4a4251c137e37d00bdb881a364f5ad740cf8574
                     <form onSubmit={this.handleSubmit} noValidate>
                        <FormControl className={classes.formControl}>
                           <Typography className={classes.label} htmlFor="email" >EMAIL ADDRESS</Typography>
                           <OutlinedInput
                              error={emailErrorText !== ''}
                              className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onBlur={this.state.formSubmitted ? this.handleValidation : null}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{emailErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <Typography className={classes.label} htmlFor="password" >PASSWORD</Typography>
                           <OutlinedInput
                              error={passwordErrorText !== ''}
                              className={classes.input}
                              id="password" type="password" autoComplete="current-password"
                              variant="outlined"
                              onBlur={this.state.formSubmitted ? this.handleValidation : null}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <Link className={classes.textLink} to="/signup"
                           onClick={this.forgotPassword}>Forget password?</Link>
                        <div>
                           <Button className={classes.submitButton}
                              type="submit" name="login">Log In</Button>
                        </div>
                     </form>
                  </div>
               </Grid>
            </Grid>
         </div>
      )
   }
}

export default withStyles(formsPageStyle)(LoginPage);