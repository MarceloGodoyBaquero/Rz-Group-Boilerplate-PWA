import axios from 'axios'
export const GET_PAYMENTS_USER = 'GET_PAYMENTS_USER'

export const getPaymentsByUserId = (id) => async dispatch => {
  try {
    const res = await axios.get(`https://rz-group-backend.herokuapp.com/api/payment/client/${id}`)
    dispatch({
      type: GET_PAYMENTS_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
export const getPaymentsByDriverId = (id) => async dispatch => {
  try {
    const res = await axios.get(`https://rz-group-backend.herokuapp.com/api/payment/user/${id}`)
    dispatch({
      type: GET_PAYMENTS_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
