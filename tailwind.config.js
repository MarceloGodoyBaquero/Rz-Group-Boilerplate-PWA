/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px'
        // => @media (min-width: 1536px) { ... }
      },
      backgroundImage: {
        Ride: "url('../public/Images/Ride-Image.webp')",
        Reserve: "url('../public/Images/Reserve-Image.jpg')",
        Garage: "url('../public/Images/Garage-Image.jpg')"
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
