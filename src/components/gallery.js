import React, { forwardRef, useContext } from "react"
import { Link } from "gatsby"
import Image from "gatsby-image/withIEPolyfill"
import { Box, Flex, Text } from "rebass"
import { style } from "styled-system"
import { colors } from "../styles/theme"
import styled from "styled-components"
import WrapContext from "../utils/wrapContext"

const columnCount = style({
  prop: "columnCount",
  key: "columnCount"
})

const Grid = styled(Box)`
  column-gap: 0;
  ${columnCount}
`

Grid.defaultProps = {
  columnCount: [2, 3]
}

const Figure = styled(
  forwardRef((props, ref) => <Box {...props} ref={ref} as="figure" p={2} />)
)`
  margin: 0;
  break-inside: avoid;
  position: relative;
  display: block;
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

const Modal = styled(Flex)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${colors.primary};
`

const Gallery = ({ edges, columns }) => {
  const context = useContext(WrapContext)
  return (
    <Grid as="section" columnCount={columns} bg="primary">
      {edges.map(edge => {
        const isClick = context.modal === edge.id
        const toggle = () =>
          isClick ? context.setModal("") : context.setModal(edge.id)
        return (
          <Figure key={edge.id}>
            {edge.link ? (
              <Link to={edge.link}>
                <Image fluid={edge.fluid} alt="hello" />
                <Figcaption>{edge.figcaption}</Figcaption>
              </Link>
            ) : (
              /* is Click */
              <Box onClick={toggle}>
                {isClick ? (
                  <Modal p={[2, 4]}>
                    <Image
                      style={{ width: "100%" }}
                      big={isClick}
                      fluid={edge.fluid}
                      objectFit="contain"
                      alt={edge.figcaption}
                    />
                  </Modal>
                ) : (
                  /* is Photo */
                  <Image fluid={edge.fluid} alt={edge.figcaption} />
                )}
              </Box>
            )}
          </Figure>
        )
      })}
    </Grid>
  )
}

export default Gallery
