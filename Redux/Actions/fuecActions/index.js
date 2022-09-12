export const FUEC = 'FUEC'

export function fuec (payload) {
  return function (dispatch) {
    dispatch({
      type: FUEC,
      payload
    })
  }
}
