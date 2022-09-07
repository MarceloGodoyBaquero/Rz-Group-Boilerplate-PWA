import { SUMAR, RESET, RESTAR } from './ActionsCreators'

export function sumar () {
  return {
    type: SUMAR
  }
}

export function restar () {
  return {
    type: RESTAR
  }
}

export function reset () {
  return {
    type: RESET
  }
}
