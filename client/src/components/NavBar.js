import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { Container, Avatar } from '@material-ui/core'
import { MenuItem, LinearProgress } from '@material-ui/core'
import { MailOutlined, NotificationsOutlined, AccountCircle, More } from '@material-ui/icons'
import { Check, Clear, ExitToAppOutlined } from '@material-ui/icons'
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
      boxShadow: 'none',
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
   progressWrapper: {
      flexGrow: 1
   },
})

class NavBar extends Component {

   constructor(props) {
      super(props)
      this.state = {
         anchorEl: null,
      }
   }

   componentWillMount() {
      if (this.props.authDetails) {
         this.updatePendingConnections()
      }
   }
   updatePendingConnections = () => {
      connectionService.getPendingConnections()
         .then(res => {
            this.setState({ notifs: res })
         })
   }

   // Sets anchor position to caller
   handleNotificationsMenuOpen = (e) => {
      let id = e.currentTarget.id
      console.log(id)

      this.setState({ anchorEl: e.currentTarget })
   }
   handleNotificationsMenuClose = () => { this.setState({ anchorEl: null }) }
   
   handleLogout = () => { 
      this.props.updateAuthStatus(false)
      console.log(this.props.history)
   }

   handleAccept = (e) => {
      let requester_id = e.currentTarget.parentNode.id
      connectionService.respondToConnection(requester_id, true)
         .then(res => {
            this.updatePendingConnections()
         })
   }
   handleDeny = (e) => {
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
      console.log(notifs)
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
         <div className={classes.progressWrapper}>
            <br />
            <LinearProgress />
         </div>
      // Placeholder
      const renderNotificationsMenu = (
         <Menu
            anchorEl={this.state.anchorEl}
            open={!!this.state.anchorEl}
            onClose={this.handleNotificationsMenuClose}>
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
         <AppBar position="static" style={{ boxShadow: 'none' }}>
            <Toolbar className={classes.navBar}>
               {renderNotificationsMenu}
               <Typography variant="h5" noWrap className={classes.title}>
                  C R E A T I V E &nbsp; H U B
               </Typography>
               <div className={classes.grow} />
               {user ?
                  <div className={classes.sectionDesktop}>
                     <LinkButton to="/discover" buttonClass={classes.coloredButton} buttonInner="Discover" />
                     {/* OnClick, show a menu of up to n (maybe have it scrollable) notifications/requests */}
                     <IconButton id="notif" color="inherit" onClick={this.handleNotificationsMenuOpen} style={{ marginLeft: 10 }}>
                        <Badge badgeContent={this.state.notifs && this.state.notifs.length} color="secondary">
                           <NotificationsOutlined />
                        </Badge>
                     </IconButton>
                     {/*  */}
                     <IconButton id="mail" color="inherit" onClick={this.handleNotificationsMenuOpen} style={{ marginLeft: 10 }}>
                        <Badge badgeContent={0} color="secondary">
                           <MailOutlined />
                        </Badge>
                     </IconButton>
                     <LinkButton to={`/profile/${user.id}`} buttonClass={classes.profile} edge="end"
                        buttonInner={(
                           <> <Avatar alt="avatar" src={avatarSrc} className={classes.avatar} />
                              <Typography className={classes.profileName}>Profile</Typography></>
                        )} />
                     <IconButton id="logout" color="inherit" onClick={this.handleLogout} >
                        <ExitToAppOutlined />
                     </IconButton>
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
                  <React.Fragment className={classes.sectionDesktop}>
                     <LinkButton to="/signup" buttonClass={classes.signUpButton} buttonInner="Sign Up" />
                     <LinkButton to="/login" buttonClass={classes.coloredButton} buttonInner="Log In" />
                  </React.Fragment>
               }
            </Toolbar>
         </AppBar>
      )
   }
}

const StyledNavBar = withStyles(navBarStyle)(NavBar)

export default withRouter(StyledNavBar)
