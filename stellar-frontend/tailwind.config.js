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
          primary: "#020818",
          secondary: "#050d2e",
          card: "#0a1628",
          input: "#071020",
        },
        accent: {
          cyan: "#00d4ff",
          violet: "#7b2fff",
          gold: "#ffd700",
        },
        confirmed: "#00ff88",
        "false-positive": "#ff4466",
      },
    },
  },
  plugins: [],
}

