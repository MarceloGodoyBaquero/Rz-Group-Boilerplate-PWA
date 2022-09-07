import {SUMAR, RESTAR, RESET} from '../Actions/ActionsCreators'

const initialState = {
  counter: 0,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SUMAR:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case RESTAR:
      return {
        ...state,
        counter: state.counter - 1,
      }
    case RESET:
      return {
        ...state,
        counter: 0,
      }
  }
  return state
}