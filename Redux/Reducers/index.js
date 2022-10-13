
import { SIGN_IN, SIGN_UP, SIGN_OUT, RECOVER_PASSWORD, VERIFY_EMAIL, SEND_OTP } from '../Actions/authActions/actionsCreator'
import { FUEC } from '../Actions/fuecActions/actionsCreator'
import { GET_VEHICLES_BY_USER, CREATE_VEHICLE } from '../Actions/vehiclesActions/actionsCreator'
import { GET_SERVICES, GET_SERVICES_OF_USER, GET_SERVICE_ID, CREATE_SERVICE, CLEAR_SERVICE } from '../Actions/servicesActions'
import { GET_VEHICLE_BY_ID } from '../Actions/vehiclesActions'
import { GET_PAYMENTS_USER } from '../Actions/paymentActions'
let userLocal
if (typeof window !== 'undefined') {
  userLocal = JSON.parse(localStorage.getItem('user'))
}
const initialState = {
  user: userLocal || {},
  fuec: {},
  services: [],
  service: {},
  vehicles: [],
  vehicle: {},
  payments: []
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
    case GET_VEHICLE_BY_ID: {
      return {
        ...state,
        vehicle: action.payload
      }
    }
    case CREATE_SERVICE: {
      return {
        ...state,
        service: {
          ...state.services,
          ...action.payload
        }
      }
    }
    case GET_SERVICES: {
      return {
        ...state,
        services: action.payload
      }
    }
    case GET_SERVICES_OF_USER : {
      return {
        ...state,
        services: { ...state.services, ...action.payload }
      }
    }
    case GET_SERVICE_ID: {
      return {
        ...state,
        service: action.payload
      }
    }
    case CLEAR_SERVICE: {
      return {
        ...state,
        service: {}
      }
    }
    case CREATE_VEHICLE: {
      return {
        ...state,
        vehicle: action.payload
      }
    }
    case GET_PAYMENTS_USER: {
      return {
        ...state,
        payments: action.payload
      }
    }
    default:
      return {
        ...state,
        payments: action.payload
      }
  }
}
