
import { SIGN_IN, SIGN_UP, SIGN_OUT, RECOVER_PASSWORD, VERIFY_EMAIL, SEND_OTP } from '../Actions/authActions/actionsCreator'
import { FUEC } from '../Actions/fuecActions/actionsCreator'
import { GET_VEHICLES_BY_USER } from '../Actions/vehiclesActions/actionsCreator'

const initialState = {
  user: {},
  fuec: {},
  vehicles: []
}

export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_UP: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SIGN_IN: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SIGN_OUT: {
      return {
        ...state,
        user: {}
      }
    }
    case RECOVER_PASSWORD: {
      return {
        ...state
      }
    }
    case VERIFY_EMAIL: {
      return {
        ...state
      }
    }
    case SEND_OTP: {
      return {
        ...state
      }
    }
    case FUEC: {
      return {
        ...state,
        fuec: action.payload
      }
    }
    case GET_VEHICLES_BY_USER: {
      return {
        ...state,
        vehicles: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
