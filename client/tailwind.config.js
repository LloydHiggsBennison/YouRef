export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        paper: "#f6f2eb",
        sand: "#e8dccb",
        coral: "#cb6d51",
        ocean: "#123c69",
        sage: "#9ab5a3",
        gold: "#c98f3d"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Trebuchet MS", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(16, 24, 40, 0.12)"
      }
    }
  },
  plugins: []
};
