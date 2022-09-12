import axios from 'axios'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SEND_OTP = 'SEND_OTP'
export const VERIFY_EMAIL = 'VERIFY_EMAIL'
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD'

export function signUp (obj, router) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/auth/signup', obj)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: SIGN_UP,
          payload: res.data
        })
        alert('tamos listos papa')
        router.push('/Verification')
      }).catch((err) => {
        alert(err.response.data)
        console.log(err.response.data)
      })
  }
}
export function signIn (obj, router) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/auth/signin', obj)
      .then((res) => {
        dispatch({
          type: SIGN_IN,
          payload: res.data
        })
        localStorage.setItem('token', res.data.accessToken)
        if (!res.data.isVerified) {
          router.push('/Verification')
        } else {
          router.push('/Main')
        }
      }
      ).catch((err) => {
        alert(err)
      })
  }
}

export function signOut () {
  return {
    type: SIGN_OUT
  }
}

export function sendOTP (obj, router = null) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/auth/sendOTP', obj)
      .then(res => {
        dispatch({
          type: SEND_OTP
        })
        if (router) {
          router.push('/ChangePassword?email=' + obj.email)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}

export function verifyEmail (obj, router) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/auth/verify', obj)
      .then(res => {
        dispatch({
          type: VERIFY_EMAIL
        })
        alert('Email verified')
        router.push('/SignIn')
      }
      ).catch((err) => {
        alert(err.response)
      })
  }
}

export function recoverPassword (obj, router) {
  return function (dispatch) {
    axios.post('https://rz-group-backend.herokuapp.com/api/auth/recovery', obj)
      .then(res => {
        dispatch({
          type: RECOVER_PASSWORD
        })
        alert('Password changed')
        router.push('/SignIn')
      }
      ).catch((err) => {
        console.log(err)
      })
  }
}
