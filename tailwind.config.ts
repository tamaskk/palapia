import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',    
        'lg': '1024px',   
        'xl': '1280px',  
      },
      fontFamily: {
        logo: ['Shrikhand', 'serif'],
        primary: ['Ubuntu', 'sans-serif']
      },
    },
  },
  plugins: [],
}
export default config
