import {SIGN_IN, SIGN_UP, SIGN_OUT, SEND_OTP, VERIFY_EMAIL, RECOVER_PASSWORD} from "./actionsCreator";
import axios from "axios";

export function signUp(obj){
return function(dispatch){
 axios.post('https://rz-group-backend.herokuapp.com/api/auth/signup', obj)
  .then((res)=>{
    dispatch({
      type: SIGN_UP,
      payload: res.data
    })
  }).catch((err)=>{
    if(err.response.data.includes('idNumber')){
      alert('The ID number you entered is already in use')
    }
    else if(err.response.data.includes('Email')){
      alert('The email you entered is already in use')
    }
    else if(err.response.data.includes('phoneNumber')){
      alert('The phone number you entered is already in use')
    }
    else {
      alert('Something went wrong')
    }
  })
}
}
export function signIn(obj){
  return function(dispatch){
    axios.post('/api/auth/signin', obj)
    .then((res)=>{
      dispatch({
        type: SIGN_IN,
        payload: res.data
      })
    }
    ).catch((err)=>{
      alert(err)
    })
  }
}

export function signOut(){
  return {
    type: SIGN_OUT
  }
}

export function sendOTP(obj){
  return function(dispatch){
    axios.post('/api/auth/sendOTP', obj)
    .then(dispatch({
        type: SEND_OTP
      })
    ).catch((err)=>{
      console.log(err)
    })
  }
}

export function verifyEmail(obj){
  return function(dispatch){
    axios.post('/api/auth/verify', obj)
    .then(dispatch({
        type: VERIFY_EMAIL
      })
    ).catch((err)=>{
      console.log(err)
    })
  }
}

export function recoverPassword(obj){
  return function(dispatch){
    axios.post('/api/auth/recovery', obj)
    .then(dispatch({
        type: RECOVER_PASSWORD
      })
    ).catch((err)=>{
      console.log(err)
    })
  }
}
