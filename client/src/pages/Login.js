import React, { Component } from 'react'

import { Typography, Box, Grid, Button, Toolbar, Hidden } from "@material-ui/core"
import { FormControl, FormHelperText, OutlinedInput } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import { formsPageStyle } from '../themes/signUpLoginTheme'

const loginPageStyle = theme => ({
   ...formsPageStyle(theme),
   imageWrapper: {
      ...formsPageStyle(theme).imageWrapper,
      minHeight: '750px',
   },
});

class LoginPage extends Component {
   state = {
      email: '',
      password: '',
      emailErrorText: '',
      passwordErrorText: '',
   }

   handleChange(event) {               // Bind to text inputs to update state
      const { id, value } = event.target
      this.setState({
         [id+"ErrorText"]: '', 
         [id]: value
      })
   }
   handleSubmit(event) {
      event.preventDefault()
      console.log(this.state)
      // 
      // Should probably change it so that login
      //
      if (this.handleValidation()){
         // Do login Stuff Here
         
         // Possibly something to do with authentication
         // - Display error msg (helperText) if login failed
         console.log("LOGIN SUCCESSFUL")
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
      else if (!validEmail(email))        errors.emailErrorText = 'invalid email'

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
         <Typography>
            <Grid container p={0}>
               <Grid item className={classes.imageWrapper} md={5}>
                  <Hidden lgDown>
                     {/* <img className={classes.image} src={Image} alt='login-photo' /> */}
                  </Hidden>
               </Grid>
               <Grid item className={classes.contentWrapper} xs={12} md={7}>
                  <Toolbar className={classes.toolBar}>
                     <div className={classes.navButton}>
                        <Link to="/signup">Sign Up</Link>
                     </div>
                  </Toolbar>
                  <div className={classes.content}>
                     <Box className={classes.header}>
                        Log In
                  </Box>
                     <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="email" >EMAIL ADDRESS</label>
                           <OutlinedInput
                              error={emailErrorText !== ''}
                              className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText className={classes.errorText}>{emailErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password" >PASSWORD</label>
                           <OutlinedInput
                              error={passwordErrorText !== ''}
                              className={classes.input}
                              id="password" type="password" autoComplete="current-password"
                              margin="normal"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText className={classes.errorText}>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <Link>Forget password?</Link>
                        <div >
                           <Button className={classes.submitButton}
                              type="submit" name="login">Log In</Button>
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