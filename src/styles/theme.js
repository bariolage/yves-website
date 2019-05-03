import "typeface-josefin-sans"

export const colors = {
  white: "#fff",
  yellow: "#FEE567",
  dark: "#181818",
  red: "#AB2E2C",
  primary: "white",
  secondary: "black"
}

export default {
  breakpoints: ["48em", "60em", "76em", "96em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: {
    body: 300,
    heading: 400,
    bold: 700
  },
  colors,
  column: [2],
  fonts: {
    sUI: "Josefin Sans, system-ui"
  }
}
