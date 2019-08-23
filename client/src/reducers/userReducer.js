import {
   TOKEN,
   LOGOUT,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_ERROR
} from '../actions/types'

const initialState = {
   authenticated: false,
}

export default function userReducer(state = initialState, action) {
   let newState = state
   switch (action.type) {
      case TOKEN:
         newState = Object.assign({}, state, { authenticated: true })
         return { ...newState, token: action.token }
      case LOGOUT:
         newState = Object.assign({}, state, { authenticated: false })
         return { ...newState }
      case LOGIN_USER_SUCCESS:
         return { ...newState, response: action.response, user: action.request }
      case LOGIN_USER_ERROR:
         return { ...newState, response: action.response }
      default:
         return state;
   }
}