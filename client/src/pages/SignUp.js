import React, { Component } from 'react'

import { Typography, Box, Grid, Button, Toolbar, Hidden, Checkbox } from '@material-ui/core'
import { FormControl, FormControlLabel, OutlinedInput } from '@material-ui/core'
import { FormHelperText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { formsPageStyle } from '../styles/formsStyles'

import { userService } from '../services/userServices'

const StyledFormControlLabel = withStyles(theme => ({
   root: {
      marginRight: 3,
      color: '#aaa',
      marginBottom: 1,
   },
}))(FormControlLabel)

class SignUpPage extends Component {
   constructor(props) {
      super(props)
      this.state = {
         name: '',
         email: '',
         password: '',
         password2: '',
         agree: false,
         nameErrorText: '',
         emailErrorText: '',
         passwordErrorText: '',
         password2ErrorText: '',
         checkedErrorText: '',
         formSubmitted: false,
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleValidation = this.handleValidation.bind(this)
      this.openTermsAndConditions = this.openTermsAndConditions.bind(this)
   }

   handleChange(event) {
      const { id, value, type, checked } = event.target
      if (type === 'checkbox')
         this.setState({
            agree: checked,         // Update error msg only when checkbox re-checked
            checkedErrorText: ''
         })
      else
         this.setState({
            [id]: value,
         })
   }
   handleSubmit(event) {
      event.preventDefault()
      this.setState({ formSubmitted: true })             // Only start showing errors if user already submitted form
      if (this.handleValidation() && this.state.agree) { // Validate form
         let { name, email, password } = this.state;
         let user = { name, email, password }
         userService.register(user)
            .then(data => {
               // TODO
               // - Redirect to login
               let token = data.token
               console.log(token)
               console.log("Redirecting to login")
            })
            .catch(err => {
               // Do stuff with error message
               // - Such as user already exists
               console.log(err)
            })
      }
   }
   handleValidation() {
      const notNull = (val) => val && val.length;
      const minLength = (len) => (val) => (val) && (val.length >= len);
      const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

      const errors = {
         nameErrorText: '',
         emailErrorText: '',
         passwordErrorText: '',
         password2ErrorText: '',
         checkedErrorText: '',
      };

      let { name, email, password, password2, agree } = this.state

      // Validate name
      if (!notNull(name)) errors.nameErrorText = 'this field is required'

      // Validate email
      if (!notNull(email)) errors.emailErrorText = 'this field is required'
      else if (!validEmail(email)) errors.emailErrorText = 'invalid email'

      // Validate password
      if (!notNull(password)) errors.passwordErrorText = 'this field is required'
      else if (!minLength(6)(password)) errors.passwordErrorText = 'Password must be 6 or more chars'
      else { // Validate password 2
         if (!notNull(password2)) errors.password2ErrorText = 'Please re-enter your password'
         else if (password !== password2) errors.password2ErrorText = 'Passwords must match.'
      }

      // Checkbox
      if (!agree) errors.checkedErrorText = 'You must agree to terms and conditions to sign up.'

      // Set error messages
      this.setState({
         nameErrorText: errors.nameErrorText,
         emailErrorText: errors.emailErrorText,
         passwordErrorText: errors.passwordErrorText,
         password2ErrorText: errors.password2ErrorText,
         checkedErrorText: errors.checkedErrorText
      })

      return errors.nameErrorText === '' &&
         errors.emailErrorText === '' &&
         errors.passwordErrorText === '' &&
         errors.password2ErrorText === '' &&
         errors.checkedErrorText === ''
   }
   openTermsAndConditions() {
      // Do something
      console.log("TAC clicked")
   }
   render() {
      const { classes } = this.props;
      let { nameErrorText, emailErrorText, passwordErrorText, password2ErrorText, checkedErrorText } = this.state

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
                     <Link to="/login" className={classes.navButtonWrapper}>
                        <Button className={classes.navButton}>Log In</Button>
                     </Link>
                  </Toolbar>
                  <div className={classes.content}>
                     <Box className={classes.header}>
                        Create an Account
                     </Box>
                     <form onSubmit={this.handleSubmit} noValidate>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="name" >NAME</label>
                           <OutlinedInput
                              error={nameErrorText !== ''}
                              className={classes.input}
                              id="name" type="text" autoComplete="name"
                              variant="outlined"
                              onBlur={this.state.formSubmitted && this.handleValidation}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{nameErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="email" >EMAIL ADDRESS</label>
                           <OutlinedInput
                              error={emailErrorText !== ''}
                              className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onBlur={this.state.formSubmitted && this.handleValidation}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{emailErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password" >PASSWORD</label>
                           <OutlinedInput
                              error={passwordErrorText !== ''}
                              className={classes.input}
                              id="password" type="password"
                              variant="outlined"
                              onBlur={this.state.formSubmitted && this.handleValidation}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password2" >REPEAT PASSWORD</label>
                           <OutlinedInput
                              error={password2ErrorText !== ''}
                              className={classes.input}
                              id="password2" type="password"
                              variant="outlined"
                              onBlur={this.state.formSubmitted && this.handleValidation}
                              onChange={this.handleChange} />
                           <FormHelperText className={classes.errorText}>{password2ErrorText}</FormHelperText>
                        </FormControl>
                        <StyledFormControlLabel
                           control={<Checkbox style={checkedErrorText ? { color: '#f44336' } : {}} color="primary" id="agree" />}
                           label="By signing up I agree with"
                           onChange={this.handleChange}>
                        </StyledFormControlLabel>
                        <Link className={classes.textLink}
                           onClick={this.openTermsAndConditions}>terms and conditions</Link>
                        <FormHelperText style={{ marginTop: 0 }} className={classes.errorText}>{checkedErrorText}</FormHelperText>
                        <div>
                           <Button className={classes.submitButton}
                              type="submit" name="create">Create</Button>
                        </div>
                     </form>
                  </div>
               </Grid>
            </Grid>
         </Typography>
      )
   }
}

export default withStyles(formsPageStyle)(SignUpPage);