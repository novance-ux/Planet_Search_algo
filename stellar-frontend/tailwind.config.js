/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        exo: ["Exo 2", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        space: {
          primary: "#020a14",
          secondary: "#06102a",
          card: "#0b1830",
          input: "#081224",
        },
        accent: {
          cyan: "#00e5ff",
          violet: "#a855f7",
          gold: "#ffab00",
          orange: "#ff6d00",
        },
        confirmed: "#00e676",
        "false-positive": "#ff5252",
      },
    },
  },
  plugins: [],
}

