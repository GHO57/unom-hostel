/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff5151",
        secondary: "#ff2121",
        tertiary: "#ffeaea",
        darkGray: "#212121",
        darkGray2: "#282c3f",
        mediumGray: "#303030",
        mediumGray1: "#3e4152",
        mediumGray2: "#555",
        lightGray: "#9e9e9e",
        lightGray2: "#aeaeae",
        lightGray3: "#dadada",
        lightGray4: "#f2f2f2",
        dimWhite: "rgba(255, 255, 255, 0.7)",
      },
      scrollSnapType: {
        y: 'y mandatory',
      },
      scrollSnapAlign: {
        center: 'center',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['responsive', 'hover', 'focus', 'active'],
      translate: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  plugins: [],
}
