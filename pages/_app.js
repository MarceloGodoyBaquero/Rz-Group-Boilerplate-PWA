import '../styles/globals.css'
import {Provider} from "react-redux";
import store from '../Redux/Store';

/* axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3001'; */

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
