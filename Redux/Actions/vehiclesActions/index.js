import axios from 'axios'

export const CREATE_VEHICLE = 'CREATE_VEHICLE'
export const GET_VEHICLE_BY_ID = 'GET_VEHICLE_BY_ID'
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE'
export const DELETE_VEHICLE = 'DELETE_VEHICLE'
export const GET_VEHICLES_BY_USER = 'GET_VEHICLES_BY_USER'
export const GET_ALL_VEHICLES = 'GET_ALL_VEHICLES'

export function createVehicle (obj, router) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/vehicles/create', obj)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: CREATE_VEHICLE,
          payload: res.data
        })
        alert('Vehiculo creado con exito, por favor validalo en tu perfil')
        router.push('/Main')
      }
      ).catch((err) => {
        alert(err.response.data)
        console.log(err.response.data)
      })
  }
}

export function getVehicleById (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/vehicles/${id}`)
      .then(res => {
        dispatch({
          type: GET_VEHICLE_BY_ID,
          payload: res.data
        })
      }).catch((err) => {
        console.log(err)
      })
  }
}

export function updateVehicle (id, obj, router) {
  return function (dispatch) {
    axios.put('https://rz-group-backend.herokuapp.com/api/vehicles/' + id, obj)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: UPDATE_VEHICLE,
          payload: res.data
        })
        alert('Vehicle updated')
        router.push('/Vehicles')
      }).catch((err) => {
        alert(err.response.data)
        console.log(err.response.data)
      })
  }
}

export function deleteVehicle (id, router) {
  return function (dispatch) {
    axios.delete('https://rz-group-backend.herokuapp.com/api/vehicles/' + id)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: DELETE_VEHICLE,
          payload: res.data
        })
        alert('Vehicle deleted')
        router.push('/Vehicles')
      }).catch((err) => {
        alert(err.response.data)
        console.log(err.response.data)
      })
  }
}

export function getVehiclesByUser (id) {
  return function (dispatch) {
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/vehicles/${id}`)
      .then(res => {
        console.log(res)
        dispatch({
          type: GET_VEHICLES_BY_USER,
          payload: res.data
        })
      }).catch((err) => {
        console.log(err)
      })
  }
}

export function getAllVehicles () {
  return function (dispatch) {
    axios.get('https://rz-group-backend.herokuapp.com/api/vehicles/all')
      .then(res => {
        dispatch({
          type: GET_ALL_VEHICLES,
          payload: res.data
        })
      }).catch((err) => {
        console.log(err)
      })
  }
}
