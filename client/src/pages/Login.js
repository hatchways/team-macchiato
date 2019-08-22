import React, { Component } from 'react'

import { Typography, Box, Grid, Button, Toolbar, Hidden } from "@material-ui/core"
import { FormControl, FormHelperText, OutlinedInput } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import { formsPageStyle } from '../themes/signUpLoginTheme'

const loginPageStyle = theme => ({
   imageWrapper: {
      minHeight: '600px',
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
      let emailErrorText = ''
      let passwordErrorText = ''
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
                        <Link to="/signup">Sign Up</Link>
                     </div>
                  </Toolbar>
                  <div className={classes.content}>
                     <Box className={classes.header}>
                        Log In
                  </Box>
                     <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="email" >Email Address</label>
                           <OutlinedInput className={classes.input}
                              id="email" type="email" autoComplete="email"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{emailErrorText}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                           <label className={classes.label} htmlFor="password" >Password</label>
                           <OutlinedInput className={classes.input}
                              id="password" type="password" autoComplete="current-password"
                              margin="normal"
                              variant="outlined"
                              onChange={this.handleChange.bind(this)} />
                           <FormHelperText>{passwordErrorText}</FormHelperText>
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

export default withStyles(formsPageStyle)(LoginPage);