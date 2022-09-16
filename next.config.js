module.exports = {
  reactStrictMode: true
}

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: true,
    mode: 'production'
  //  los ultimos 2 parametros quitan advertencias de la consola
  }
})

/* module.exports = {
  env: {
    API_URL: 'https://rz-group-backend.herokuapp.com/'
  },
} */
