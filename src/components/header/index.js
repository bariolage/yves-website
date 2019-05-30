import React, { forwardRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Flex, Heading } from "rebass"
import styled from "styled-components"
import Navigation from "./navigation"
import Locale from "./locale"
import Sticky from "./sticky"
import { Link } from "../elements"

const Header = styled(
  forwardRef((props, ref) => (
    <Flex
      as="header"
      {...props}
      ref={ref}
      width={1}
      p={2}
      justifyContent="space-between"
      alignItems="baseline"
      bg="white"
      flexWrap="wrap"
    />
  ))
)``

const H1 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h1"
      fontSize={[5, 6, 7]}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

export default ({ children }) => {
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
    <>
      {children ? (
        <Sticky>
          <Header>{children}</Header>
        </Sticky>
      ) : (
        <Header>
          <Link
            to="/"
            aria-label="yves le bras - accueil"
            textDecoration="none"
          >
            <H1 id="top">{siteMetadata.title}</H1>
          </Link>
          <Locale />
          <Navigation />
        </Header>
      )}
    </>
  )
}
