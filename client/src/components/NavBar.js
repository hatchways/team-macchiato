import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { Box, Avatar } from '@material-ui/core'
import { MailOutlined, NotificationsOutlined, AccountCircle, More } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'

import { withRouter } from 'react-router-dom'

import Button from './ButtonComponents'
import { LinkButton } from './ButtonComponents'

const breakPoint = 'xs'
const navBarStyle = theme => ({
   navBar: {
      background: '#2e363d',
      height: 90,
      paddingLeft: 50,
      paddingRight: 50,
   },
   title: {
      display: 'block',
      fontFamily: '"Oswald"',
      fontSize: 26,
   },
   grow: {
      flexGrow: 1,
   },
   sectionDesktop: {
      color: 'white',
      display: 'none',
      [theme.breakpoints.up(breakPoint)]: {
         display: 'flex',
      },
   },
   avatar: {
      marginLeft: 10,
      marginRight: 10,
      width: 30,
      height: 30,
   },
   profile: {
      display: 'flex',
      marginLeft: 20,
      padding: 0,
   },
   profileName: {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'none',
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up(breakPoint)]: {
         display: 'none',
      }
   },
   navBarComponents: { display: 'flex' },
   signUpButton: { color: 'white' },
   loginButton: {
      marginLeft: 10,
      color: 'white',
      backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)',
   },
})

class NavBar extends Component {

   handleNotificationsMenuOpen() {

   }

   handleProfileMenuOpen() {

   }

   handleMobileMenuClose() {

   }

   render() {
      const { classes, location } = this.props
      const avatarSrc = "https://api.adorable.io/avatars/30/abel@adorable.io.png";

      if (location.pathname === '/signup' || location.pathname === '/login') {
         return null;
      }
      return (
         <AppBar position="static">
            <Toolbar className={classes.navBar}>
               <Typography variant="h5" noWrap className={classes.title}>
                  C R E A T I V E &nbsp; H U B
               </Typography>
               <div className={classes.grow} />
               {this.props.authDetails ?
                  // <div>
                  <div className={classes.sectionDesktop}>
                     <LinkButton to="/discover" buttonClass={classes.signUpButton} text="Discover" />
                     {/* OnClick, show a menu of up to n (maybe have it scrollable) notifications/requests */}
                     <IconButton color="inherit" onClick={this.handleNotificationsMenuOpen}>
                        <Badge badgeContent={17} color="secondary">
                           <NotificationsOutlined />
                        </Badge>
                     </IconButton>
                     {/*  */}
                     <IconButton color="inherit" style={{ marginLeft: 10 }}>
                        <Badge badgeContent={4} color="secondary">
                           <MailOutlined />
                        </Badge>
                     </IconButton>
                     <Button className={classes.profile} onClick={this.handleProfileMenuOpen} edge="end">
                        <Avatar alt="avatar" src={avatarSrc} className={classes.avatar} />
                        <Typography className={classes.profileName}>Profile&nbsp;&nbsp;&nbsp;</Typography>
                     </Button>
                  </div>
                  //    Responsive WIP
                  //    <div className={classes.sectionMobile}>
                  //       <IconButton
                  //          onClick={this.handleMobileMenuOpen}
                  //          color="inherit" >
                  //          <More />
                  //       </IconButton>
                  //    </div>
                  // </div>
                  :
                  <div className={classes.sectionDesktop}>
                     <LinkButton to="/signup" buttonClass={classes.signUpButton} text="Sign Up" />
                     <LinkButton to="/login" buttonClass={classes.loginButton} text="Log In" />
                  </div>
               }
            </Toolbar>
         </AppBar>
      )
   }
}

const StyledNavBar = withStyles(navBarStyle)(NavBar)

export default withRouter(StyledNavBar)
