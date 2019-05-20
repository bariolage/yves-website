import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Box } from "rebass"
import Header from "./header"
import Navigation from "./navigation"
import SEO from "./SEO"
import { Link as GatsbyLink } from "gatsby"
import { H1, Link } from "./elements"
import "typeface-josefin-sans"

export const colors = {
  white: "#fff",
  yellow: "#FEE567",
  dark: "#181818",
  red: "#AB2E2C",
  primary: "white",
  secondary: "black"
}

export const theme = {
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

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const GlobalStyle = createGlobalStyle`
* { 
  box-sizing: border-box; 
  margin: 0;}
body {

  background: ${colors.primary};
  
}
`

const Wrap = styled(Box)`
  min-height: 100vh;
`
const Main = styled(Box)`
  margin: 0 auto;
  max-width: 60em;
`
const Layout = ({ children, albumData }) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <ThemeProvider theme={theme}>
      <Wrap width={1} px={[2, 3, 4]} py={4}>
        <SEO albumData={albumData} />
        <GlobalStyle />
        <Header id="#home">
          <Link as={GatsbyLink} to="/" aria-label="yves le bras - accueil">
            <H1 id="top">{siteMetadata.title}</H1>
          </Link>
            <Navigation />
        </Header>
        <Main as="main" width={1}>
          {children}
        </Main>
      </Wrap>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  albumData: {}
}

export default Layout
