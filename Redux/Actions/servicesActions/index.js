import axios from 'axios'
import { toast } from 'react-toastify'
export const CREATE_SERVICE = 'CREATE_SERVICE'
export const GET_SERVICES = 'GET_SERVICES'
export const GET_SERVICES_OF_USER = 'GET_SERVICES_OF_USER'
export const GET_SERVICE_ID = 'GET_SERVICE_ID'
export const UPDATE_SERVICE = 'UPDATE_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'
export const CLEAR_SERVICE = 'CLEAR_SERVICE'

export function createService (payload, router) {
  return function (dispatch) {
    payload.asociateDriver
      ? toast.promise(
        axios.post(`https://rz-group-backend.herokuapp.com/api/services/create/${payload.asociateDriver}`, payload), {
          pending: 'Creando servicio...',
          success: 'Servicio creado con éxito',
          error: 'Error al crear servicio'
        }).then(res => {
        dispatch({
          type: CREATE_SERVICE,
          payload: res.data
        })
        // setTimeout(() => {
        //   router.push('/client/travels')
        // }, 2000)
      }).catch(err => {
        console.log(err)
        toast.error(err.response.data)
      })
      : toast.promise(
        axios.post('https://rz-group-backend.herokuapp.com/api/services/create', payload), {
          pending: 'Creando servicio...',
          success: 'Servicio creado con éxito',
          error: 'Error al crear servicio'
        })
        .then(res => {
          dispatch({
            type: CREATE_SERVICE,
            payload: res.data
          })
          // setTimeout(() => {
          //   router.push('/client/travels')
          // }, 2000)
        }).catch(err => console.log(err))
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

export function getServicesUserId (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/services/${id}`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_SERVICES,
          payload: res.data
        })
      }).catch(err => {
        console.log(err.response.data)
        dispatch({
          type: GET_SERVICES,
          payload: err.response.data
        })
      })
  }
}

export function getIncomingServices (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/driver/${id}`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_SERVICES,
          payload: res.data
        })
      }).catch(err => {
        console.log(err.response.data)
        dispatch({
          type: GET_SERVICES,
          payload: err.response.data
        })
      })
  }
}

export function getServiceId (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(res => {
        console.log(res.data)
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
          type: GET_SERVICES_OF_USER,
          payload: res.data
        })
      })
  }
}

export function deleteService (id) {
  return function (dispatch) {
    axios.delete(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(res => {
        console.log(res)
        dispatch({
          type: DELETE_SERVICE,
          payload: res.data
        })
      }).catch(err => console.log(err))
  }
}

export function cancelService (id) {
  return function (dispatch) {
    toast.promise(axios.post(`https://rz-group-backend.herokuapp.com/api/services/cancel/${id}`), {
      pending: 'Cancelando servicio...',
      success: 'Servicio cancelado con éxito',
      error: 'Error al cancelar servicio'
    }).then(res => {
      dispatch({
        type: DELETE_SERVICE,
        payload: res.data
      })
      setTimeout(() => {
        window.location.href = '/client/travels'
      }, 4000)
    }).catch(err =>
      console.log(err))
  }
}

export function clearService (id) {
  return function (dispatch) {
    dispatch({
      type: CLEAR_SERVICE,
      payload: {}
    })
  }
}
