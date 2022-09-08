module.exports = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});


/* module.exports = {
  env: {
    API_URL: 'https://rz-group-backend.herokuapp.com/' 
  },
} */
