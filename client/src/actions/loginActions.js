import {
   FETCH_TOKEN, 
   LOGOUT, 
   RESET,      // Logout?
   LOGIN,
} from './types'

/**
 * 
 * dispatch( LOGINUSER ) -> calls action
 * 
 * does this thing
 * vvvvvvvvvvvvvvvvvvvvv
 * fetch(url, post)
 * .then(res => res.json())
 * .then(token, dispatch(FETCH_TOKEN, token) )
 * 
 */
// Take in email and password and send to backend server
export const loginUser = (user) => ({
   type: LOGIN,
   user
});

// Takes a token as a response and stores to localSession
export const fetchToken = (payload) => ({
   type: FETCH_TOKEN,
   payload
});

export const logoutUser = () => ({
   type: LOGOUT
});

export const clearStore = () => ({
   type: RESET
});