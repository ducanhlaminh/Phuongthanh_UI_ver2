module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      lemonada: ["Lemonada", "cursive"],
    },
    extend: {
      backgroundColor: {
        "overlay-70": "rgba(0,0,0,0.7)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-80": "rgba(0,0,0,0.8)",
      },
      width: {
        256: "256px",
        r256: "calc(100% - 256px)",
      },
      dropShadow: {
        white:
          "--tw-drop-shadow: drop-shadow(0 4px 3px rgb(255 255 255 / 0.07)) drop-shadow(0 2px 2px rgb(255 255 255 / 0.06))",
      },
      animation: {
        modalShow: "modalShow .3s linear ",
        modalClose: "modalShow .3s linear ",
        "slide-right": "slide-right 0.3s ease-out both;",
      },
      keyframes: {
        modalShow: {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(0%)" },
        },
        modalClose: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100px)" },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            " -webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        ruda: ["Ruda", "sans-serif"],
        tactitle: ["Syne Tactile", "cursive"],
        qwitcher: ["Qwitcher Grypen", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  mode: "jit",
};
