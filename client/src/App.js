import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import CreateProjectForm from "./pages/CreateProjectForm";
import CreateProjectFormHook from "./pages/CreateProjectFormHook";
import ProfilePage from "./pages/Profile";

import "./styles/App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/project" component={CreateProjectForm} />
        <Route path="/project-hook" component={CreateProjectFormHook} />
        <Route path="/profile/:profileId" component={ProfilePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
