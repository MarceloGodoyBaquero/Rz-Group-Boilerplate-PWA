import axios from 'axios'
import { toast } from 'react-toastify'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SEND_OTP = 'SEND_OTP'
export const VERIFY_EMAIL = 'VERIFY_EMAIL'
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD'

export function signUp (obj, router) {
  return function (dispatch) {
    toast.promise(axios.post('https://rz-group-backend.herokuapp.com/api/auth/signup', obj), {
      pending: 'Cargando...',
      success: 'Usuario creado con éxito',
      error: 'Error al crear usuario'
    }).then((res) => {
      dispatch({
        type: SIGN_UP,
        payload: res.data
      })
      setTimeout(() => {
        router.push('/Verification')
      }, 2000)
    }).catch((err) => {
      // show a toast with the error
      toast.error(err.response.data.msg)
    })
  }
}
export function signIn (obj, router) {
  return function (dispatch) {
    toast.promise(
      axios.post('https://rz-group-backend.herokuapp.com/api/auth/signin', obj), {
        pending: 'Iniciando sesión...',
        success: 'Sesión iniciada con éxito',
        error: 'Error al iniciar sesión'
      })
      .then((res) => {
        dispatch({
          type: SIGN_IN,
          payload: res.data
        })
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.accessToken)
        if (!res.data.isVerified) {
          setTimeout(() => {
            router.push('/Verification')
          }, 2000)
        } else if (res.data.roles === 'admin') {
          setTimeout(() => {
            router.push('/admin')
          }, 2000)
        } else {
          setTimeout(() => {
            router.push('/Main')
          }, 2000)
        }
      }
      ).catch((err) => {
        if (err.response.data.includes('password')) {
          toast.error('Contraseña incorrecta')
        } else {
          toast.error('Ocurrió un error al iniciar sesión, intente de nuevo')
        }
      })
  }
}

export function signOut () {
  return function (dispatch) {
    dispatch({
      type: SIGN_OUT,
      payload: {}
    })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
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
    toast.promise(axios.post('https://rz-group-backend.herokuapp.com/api/auth/verify', obj), {
      pending: 'Verificando...',
      success: 'Email verificado con éxito',
      error: 'Error al verificar email'
    })
      .then(res => {
        dispatch({
          type: VERIFY_EMAIL
        })
        setTimeout(() => {
          router.push('/SignIn')
        }, 2000)
      }
      ).catch((err) => {
        console.log(err)
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
