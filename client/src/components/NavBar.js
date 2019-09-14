import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { Box, Avatar } from '@material-ui/core'
import { MenuItem, CircularProgress } from '@material-ui/core'
import { MailOutlined, NotificationsOutlined, AccountCircle, More } from '@material-ui/icons'
import { Check, Clear } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'

import { withRouter, Link } from 'react-router-dom'

import Button from './ButtonComponents'
import { LinkButton } from './ButtonComponents'

import Menu from './MenuComponent'
import { MenuHeader, StyledMenuItem } from './MenuComponent'

import { connectionService } from '../services/userServices'

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
      // marginLeft: 10,
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
   coloredButton: {
      marginLeft: 10,
      color: 'white',
      backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)',
   },
})

class NavBar extends Component {

   constructor(props) {
      super(props)
      this.state = {
         anchorEl: null,
      }
      this.updatePendingConnections = this.updatePendingConnections.bind(this)
      this.handleMenuOpen = this.handleMenuOpen.bind(this)
      this.handleMenuClose = this.handleMenuClose.bind(this)
      this.handleAccept = this.handleAccept.bind(this)
      this.handleDeny = this.handleDeny.bind(this)
   }

   componentWillMount() {
      if (this.props.authDetails) {
         this.updatePendingConnections()
      }
   }
   updatePendingConnections() {
      connectionService.getPendingConnections()
         .then(res => {
            // console.log(res)
            this.setState({ notifs: res })
         })
   }

   // Sets anchor position to caller
   handleMenuOpen(e) {
      let id = e.currentTarget.id
      console.log(id)

      this.setState({ anchorEl: e.currentTarget })
   }
   handleMenuClose() { this.setState({ anchorEl: null }) }

   handleAccept(e) {
      let requester_id = e.currentTarget.parentNode.id
      connectionService.respondToConnection(requester_id, true)
         .then(res => {
            this.updatePendingConnections()
         })
   }
   handleDeny(e) {
      let requester_id = e.currentTarget.parentNode.id
      connectionService.respondToConnection(requester_id, false)
         .then(res => {
            this.updatePendingConnections()
         })
   }

   render() {
      const { classes, location } = this.props

      const user = this.props.authDetails
      // Placeholder
      const avatarSrc = "https://api.adorable.io/avatars/30/abel@adorable.io.png";

      let notifs = this.state.notifs
      let menuNotifications = notifs ?
         notifs.map(n =>
            <StyledMenuItem key={n.id.toString()} id={n.id}>
               {/* Replace Avatar with actual pfp -- First set default pfp then set ability to upload pfp to users */}
               <Avatar alt="avatar" src={avatarSrc} className={classes.avatar} />
               <Typography>{n.name}</Typography>
               <div className={classes.grow} />
               <IconButton style={{ color: 'green' }} onClick={this.handleAccept} >
                  <Check />
               </IconButton>
               <IconButton color='secondary' onClick={this.handleDeny} >
                  <Clear />
               </IconButton>
            </StyledMenuItem>) :
         <CircularProgress className={classes.progress} />
      // Placeholder
      const renderMenu = (
         <Menu
            anchorEl={this.state.anchorEl}
            open={!!this.state.anchorEl}
            onClose={this.handleMenuClose}>
            <MenuHeader>
               <Typography>Notifications</Typography>
            </MenuHeader>
            {menuNotifications}
         </Menu>
      );

      if (location.pathname === '/signup' || location.pathname === '/login') {
         return null;
      }
      return (
         <AppBar position="static">
            <Toolbar className={classes.navBar}>
               {renderMenu}
               <Typography variant="h5" noWrap className={classes.title}>
                  C R E A T I V E &nbsp; H U B
               </Typography>
               <div className={classes.grow} />
               {user ?
                  // <div>
                  <div className={classes.sectionDesktop}>
                     <LinkButton to="/discover" buttonClass={classes.coloredButton} buttonInner="Discover" />
                     {/* OnClick, show a menu of up to n (maybe have it scrollable) notifications/requests */}
                     <IconButton id="notif" color="inherit" onClick={this.handleMenuOpen} style={{ marginLeft: 10 }}>
                        <Badge badgeContent={this.state.notifs && this.state.notifs.length} color="secondary">
                           <NotificationsOutlined />
                        </Badge>
                     </IconButton>
                     {/*  */}
                     <IconButton id="mail" color="inherit" onClick={this.handleMenuOpen} style={{ marginLeft: 10 }}>
                        <Badge badgeContent={4} color="secondary">
                           <MailOutlined />
                        </Badge>
                     </IconButton>
                     <LinkButton to={`/profile/${user.id}`} buttonClass={classes.profile} edge="end"
                        buttonInner={(
                           <> <Avatar alt="avatar" src={avatarSrc} className={classes.avatar} />
                              <Typography className={classes.profileName}>Profile</Typography></>
                        )} />
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
                     <LinkButton to="/signup" buttonClass={classes.signUpButton} buttonInner="Sign Up" />
                     <LinkButton to="/login" buttonClass={classes.coloredButton} buttonInner="Log In" />
                  </div>
               }
            </Toolbar>
         </AppBar>
      )
   }
}

const StyledNavBar = withStyles(navBarStyle)(NavBar)

export default withRouter(StyledNavBar)
