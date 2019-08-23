import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from 'react-redux';

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";

import store from "./store/store";

function App() {
   return (
      <Provider store={store}>
         <MuiThemeProvider theme={theme}>
            <BrowserRouter>
               <Route path="/" exact component={LandingPage} />
               <Route path="/login" component={LoginPage} />
               <Route path="/signup" component={SignUpPage} />
               <Route path="/profile/:profileId" component={ProfilePage} />
            </BrowserRouter>
         </MuiThemeProvider>
      </Provider>
   );
}

export default App;
