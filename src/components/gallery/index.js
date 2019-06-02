import React, { forwardRef, useContext, useEffect } from "react"
import Img from "gatsby-image/withIEPolyfill"
import { Box, Text } from "rebass"
import styled from "styled-components"
import { Link } from "../elements"
import Masonry from "./masonry"

export default ({ edges, isAlbum = false }) => {
  return (
    <>
      <Masonry>
        {edges.map(edge => (
          <Figure key={edge.id}>
            <Link to={edge.link} aria-label={edge.figcaption}>
              <Img fluid={edge.fluid} alt={edge.figcaption} />
              <Figcaption>{!isAlbum && edge.figcaption}</Figcaption>
            </Link>
          </Figure>
        ))}
      </Masonry>
    </>
  )
}

const Figure = styled(
  forwardRef((props, ref) => <Box {...props} ref={ref} as="figure" />)
)`
  margin: 8px;
  break-inside: avoid;
  position: relative;
  display: block;
  cursor: ${props => (props.withLighbox ? "zoom-in" : "pointer")};
  &:hover {
    opacity: 0.9 !important;
  }
`

const Figcaption = styled(
  forwardRef((props, ref) => (
    <Text
      {...props}
      as="figcaption"
      fontFamily="sUI"
      fontSize={1}
      color="primary"
      p={3}
      ref={ref}
    />
  ))
)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
`
