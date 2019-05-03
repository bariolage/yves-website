import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import theme from "../styles/theme"
import { Base } from "../styles/base"
import styled, { ThemeProvider } from "styled-components"
import { Box } from "rebass"
import Navigation from "./navigation"
import SEO from "./SEO"
import { Link as GatsbyLink } from "gatsby"
import { H1, Header, Link } from "./elements"

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const Wrap = styled(Box)`
  min-height: 100vh;
`
const Main = styled(Box)`
  margin: 0 auto;
  max-width: 60em;
`
const Layout = ({ children, albumData }) => {
  const {
    site: { siteMetadata },
    allNavigationYaml: { navLinks }
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allNavigationYaml {
        navLinks: edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  `)
  return (
    <ThemeProvider theme={theme}>
      <Wrap width={1} px={[2, 3, 4]} py={4}>
        <SEO albumData={albumData} />
        <Base />
        <Header id="#home">
          <Link as={GatsbyLink} to="/">
            <H1 id="top">{siteMetadata.title}</H1>
          </Link>
          <Navigation navLinks={navLinks} />
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
