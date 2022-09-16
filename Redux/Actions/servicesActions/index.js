import axios from 'axios'
export const CREATE_SERVICE = 'CREATE_SERVICE'
export const GET_SERVICES = 'GET_SERVICES'
export const GET_SERVICE_ID = 'GET_SERVICE_ID'
export const UPDATE_SERVICE = 'UPDATE_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'

export function createService (payload) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/services/create', payload)
      .then(res => {
        dispatch({
          type: CREATE_SERVICE,
          payload: res.data
        })
      })
  }
}

export function getServices () {
  return function (dispatch) {
    axios.get('https://rz-group-backend.herokuapp.com/api/services/all')
      .then(res => {
        dispatch({
          type: GET_SERVICES,
          payload: res.data
        })
      })
  }
}

export function getServiceId (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(res => {
        dispatch({
          type: GET_SERVICE_ID,
          payload: res.data
        })
      })
  }
}

export function updateService (id, payload) {
  return function (dispatch) {
    axios.put(`https://rz-group-backend.herokuapp.com/api/services/${id}`, payload)
      .then(res => {
        dispatch({
          type: UPDATE_SERVICE,
          payload: res.data
        })
      })
  }
}

export function deleteService (id) {
  return function (dispatch) {
    axios.delete(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_SERVICE,
          payload: res.data
        })
      })
  }
}
