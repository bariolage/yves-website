import { createGlobalStyle } from "styled-components"
import { colors } from "./theme"
export const Base = createGlobalStyle`
* { 
  box-sizing: border-box; 
  margin: 0;}
body {

  background: ${colors.primary};
  
}
`
