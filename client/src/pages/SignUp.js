import React, { Component } from 'react'

import { Typography, Box, Grid, Button, AppBar, Toolbar, Hidden, Checkbox } from "@material-ui/core"
import { FormControl, FormGroup, FormControlLabel, OutlinedInput, Input, InputLabel, Label } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Image from '../assets/images/login-photo.png'

const signUpPageStyle = theme => ({
   imageWrapper: {
      backgroundSize: '100%',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      minHeight: '810px',
      height: '100vh',
      overflow: 'hidden',
   },
   image: {},
   pageWrapper: { minHeight: '600px', },
   toolBar: { background: 'white', boxShadow: 'none' }, // Used to wrap the to Button
   toLogin: {
      top: theme.spacing(5),
      right: theme.spacing(5),
      left: 'auto',
      position: 'absolute',
   },
   content: {
      maxWidth: '50%',
      marginLeft: '20%',
      marginTop: '10%',
      flex: '1 1 auto',
      overflow: 'auto',
   },
   header: {
      fontSize: 38,
      marginBottom: theme.spacing(5),
   },
   formControl: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(3),
      display: 'flex',
   },
   label: {
      marginBottom: theme.spacing(1)
   },
   createButton: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5),
   },
});

const StyledFormControlLabel = withStyles({
   root: {},
   label: {

   }
})(FormControlLabel)

class SignUpPage extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      agree: false,
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
      console.log(this.state)
   }
   render() {
      const { classes } = this.props;
      return (
         <Grid container className={classes.loginContainer} p={0}>
            <Grid item className={classes.imageWrapper} lg={5}>
               <Hidden lgDown>
                  <img className={classes.image} src={Image} alt='login-photo' />
               </Hidden>
            </Grid>
            <Grid item className={classes.pageWrapper} xs={12} lg={7}>
               <Toolbar className={classes.toolBar}>
                  <div className={classes.toLogin}>
                     <Link to="/login">Log In</Link>
                  </div>
               </Toolbar>
               <div className={classes.content}>
                  <Box className={classes.header}>
                     Create an Account
                  </Box>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                     <FormControl className={classes.formControl}>
                        <label className={classes.label} htmlFor="name" >Name</label>
                        <OutlinedInput className={classes.input}
                           id="name" type="text" autoComplete="name"
                           variant="outlined"
                           onChange={this.handleChange.bind(this)} />
                     </FormControl>
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
                           id="password" type="password"
                           margin="normal"
                           variant="outlined"
                           onChange={this.handleChange.bind(this)} />
                     </FormControl>
                     <FormControl className={classes.formControl}>
                        <label className={classes.label} htmlFor="password2" >Repeat Password</label>
                        <OutlinedInput className={classes.input}
                           id="password2" type="password"
                           margin="normal"
                           variant="outlined"
                           onChange={this.handleChange.bind(this)} />
                     </FormControl>
                     <StyledFormControlLabel
                        control={<Checkbox color="primary" id="agree" />}
                        label="By signing up I agree with terms and conditions"
                        onChange={this.handleChange.bind(this)}>
                     </StyledFormControlLabel>
                     {/* <label>By signing up I agree with <b></b></label> */}
                     <div>
                        <Button type="submit" name="create" className={classes.createButton}>Create</Button>
                     </div>
                  </form>
               </div>
            </Grid>
         </Grid>
      )
   }
}

export default withStyles(signUpPageStyle)(SignUpPage);