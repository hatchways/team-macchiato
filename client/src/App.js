import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import CreateProjectFormHook from "./pages/CreateProjectFormHook";
import ProfilePage from "./pages/Profile";
import DiscoverPage from "./pages/Discover";
import CreateProjectForm from "./components/CreateProjectForm";
import CreateProjectFormHook from "./components/CreateProjectFormHook";

import NavBar from "./components/NavBar"

import "./styles/App.css";

import { userService } from './services/userServices'

class App extends Component {

  handleUpdateUserState(user) {
    if (!user) {
      user = JSON.parse(localStorage.getItem('user')).user
      // If no user is in storage
      if (!user)
        return 'No user is logged in'
      return this.setState({ user: JSON.parse(localStorage.getItem('user')).user })
    }
    // Directly update state to user param
    // CURRENTLY UNUSED 
    return this.setState({ user: user })
  }

  // true to get App to update its own state by fetching user from localStorage
  // false to logout user (With App updating state to reflect this)
  updateAuthenticationStatus = authenticated => {
    if (authenticated) {
      this.handleUpdateUserState()
    } else {
      this.setState({ user: null })
      userService.logout()
    }
  }

  componentWillMount() {
    // Fetch user data from localStorage
    this.handleUpdateUserState()
  }

  render() {
    let userProps = {
      updateAuthenticationStatus: this.updateAuthenticationStatus,
      currentUserInfo: this.state.user,
      // Email, Id, and Name
    }
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar authDetails={this.state.user} />
          {/* TODO: Make landing page redirect to somewhere useful */}
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/signup" component={SignUpPage} />
            <AppliedRoute path="/login" component={LoginPage} props={userProps} />
            <AppliedRoute path="/profile/:profileId" component={ProfilePage} props={userProps}/>
            {/* Any further Routes we add that require user state, use an AppliedRoute Component and pass in props (as an obj) 
              
              All routes may be subject to restructuring

              Below are temp routes
            */}
            <Route path="/discover" component={DiscoverPage} />
            <Route path="/project-hook" component={CreateProjectFormHook} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

// Simple component to pass props through
const AppliedRoute = ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />

export default App;
