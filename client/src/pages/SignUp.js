import React, { Component } from 'react'

import { Typography, Box, Grid, Button, Toolbar, Hidden, Checkbox } from "@material-ui/core"
import { FormControl, FormControlLabel, OutlinedInput } from "@material-ui/core"
import { FormHelperText } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Image from '../assets/images/login-photo.png'

import { formsPageStyle } from '../themes/signUpLoginTheme'

const StyledFormControlLabel = withStyles(theme => ({
   root: {
      marginRight: 3,
      color: '#aaa',
      fontWeight: theme.typography.fontWeightMedium,
   },
   label: {
      marginBottom: 1,
   }
}))(FormControlLabel)

function handleValidation() {
   return false;
}

const signUpPageStyle = theme => ({
   ...formsPageStyle(theme),
   imageWrapper: {
      ...formsPageStyle(theme).imageWrapper,
      minHeight: '750px',
   },
   termsAndConditions: {
      fontWeight: theme.typography.fontWeightMedium,
      color: 'black',
      textDecoration: 'none',
   }
});

class SignUpPage extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      agree: false,
      passwordError: 'lol',
   }

   handleChange(event) {               // Bind to text inputs to update state
      const { id, value, type, checked } = event.target
      if (type === 'checkbox')
         this.setState({
            agree: checked
         })
      else
         this.setState({
            [id]: value
         })
   }
   handleSubmit(event) {
      event.preventDefault()
      let { name, email, password } = this.state;
      let user = { name, email, password }
      console.log(this.state)
      fetch('http://localhost:3001/api/auth/register', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
      })
         .then(res => res.json())
         .then(data => {
            // Do stuff with token
            let token = data.token
            console.log(data)
         })
         .catch(err => {
            console.log(err)
         });
   }
   termsAndConditions() {
      // Do something
      console.log("TAC clicked")
   }
   render() {
      const { classes } = this.props;
      let nameErrorText = ''
      let emailErrorText = ''
      let passwordErrorText = ''
      let password2ErrorText = ''
      return (
         <Typography>
            <Grid container p={0}>
               <Grid item className={classes.imageWrapper} md={5}>
                  <Hidden lgDown>
                     <img className={classes.image} src={Image} alt='login-photo' />
                  </Hidden>
               </Grid>
               <Grid item className={classes.contentWrapper} xs={12} md={7}>
                  <Toolbar className={classes.toolBar}>
                     <div className={classes.navButton}>
                        <Link to="/login">Log In</Link>
                     </div>
                  </Toolbar>
                  <div className={classes.content}>
                     <Box className={classes.header}>
                        Create an Account
                     </Box>
                     <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="name" >NAME</label>
                           <OutlinedInput
                              className={classes.input}
                              id="name" type="text" autoComplete="name"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{nameErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="email" >EMAIL ADDRESS</label>
                           <OutlinedInput
                              className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{emailErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password" >PASSWORD</label>
                           <OutlinedInput
                              className={classes.input}
                              id="password" type="password"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password2" >REPEAT PASSWORD</label>
                           <OutlinedInput
                              className={classes.input}
                              id="password2" type="password"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{password2ErrorText}</FormHelperText>
                        </FormControl>
                        <StyledFormControlLabel
                           control={<Checkbox color="primary" id="agree" />}
                           label="By signing up I agree with"
                           onChange={this.handleChange.bind(this)}>
                        </StyledFormControlLabel>
                        <Link className={classes.termsAndConditions}
                           onClick={this.termsAndConditions.bind(this)}>terms and conditions</Link>
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

export default withStyles(signUpPageStyle)(SignUpPage);