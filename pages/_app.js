import React from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../Redux/Store'
import PropTypes from 'prop-types'

export default function MyApp ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
