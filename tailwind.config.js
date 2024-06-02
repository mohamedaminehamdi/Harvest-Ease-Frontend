/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
      darkGrey:'#A0A8A9',
      darkBlue:'#3B4D61',
      pastelGreen:'#B0CDB3',
      lightGreen:'#D8E4D9',
      grayishGreen:'#D1DDD3',
      darkerGreen:'#C1E1C1',
      pastelYellow:'#F7FECB', 
      grassGreen:'#154734', 
      willowGreen:'#DEE6CF',   
      ceylaniteGreen:'#394D1F',
      mustardGreen:'#C4D4AC', 
      soldierGreen:'#9CA466',     
      leafGreen:'#929F5B',
      fallBrown:'#636C32',
      },
      keyframes: {
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },

        },
        dropOnce: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '60%': { transform: 'translateY(0)', opacity: 1 },
          '80%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
      },
      animation: {
        bounceOnce: 'bounceOnce 1s ease-out 1',
        dropOnce: 'dropOnce 0.5s ease-out 1',
      },
    },
     
  },
  plugins: [],
}