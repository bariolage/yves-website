import React, { forwardRef, useState, useEffect } from "react"
import Img from "gatsby-image/withIEPolyfill"
import { Box, Text } from "rebass"
import styled from "styled-components"
import { Link } from "../elements"
import Lightbox from "react-images"
import Masonry from "./masonry"
import { useTrail, animated } from "react-spring"

const Figure = styled(
  forwardRef((props, ref) => <Box {...props} ref={ref} as="figure" />)
)`
  margin: 0;
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

export default ({ edges, columns, withLighbox = false }) => {
  const [images, setImages] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length === 0 && edges) {
      setImages(
        edges.map((e, i) => ({
          //index: i,
          ...e.fluid,
        }))
      )
    }
    console.log(images)
  }, [images])
  const [trail, set, stop] = useTrail(edges.length, () => ({
    opacity: 0,
    transform: "translate3d(0, 16px, 0)"
  }))
  set({ opacity: 1, transform: "translate3d(0, 0px, 0)" })
  stop()
  return (
    <>
      <Masonry>
        {trail.map((props, index) => (
          <animated.div style={props} key={edges[index].id}>
            <Figure
              onClick={() => {
                setCurrent(index)
                setOpen(true)
              }}
              withLighbox={withLighbox}
            >
              {withLighbox ? (
                <Img fluid={edges[index].fluid} alt={edges[index].figcaption} />
              ) : (
                <Link
                  to={edges[index].link}
                  aria-label={edges[index].figcaption}
                >
                  <Img
                    fluid={edges[index].fluid}
                    alt={edges[index].figcaption}
                  />
                  <Figcaption>{edges[index].figcaption}</Figcaption>
                </Link>
              )}
            </Figure>
          </animated.div>
        ))}
      </Masonry>
      {withLighbox && (
        <Lightbox
          images={images}
          onClose={() => {
            setOpen(false)
            setCurrent(0)
          }}
          onClickPrev={() => setCurrent(current - 1)}
          onClickNext={() => setCurrent(current + 1)}
          currentImage={current}
          isOpen={isOpen}
          backdropClosesModal
          showThumbnails
          showImageCount={false}
          onClickThumbnail={imageIndex => setCurrent(imageIndex)}
          theme={{
            container: {
              backgroundColor: "rgba(0,0,0,0.4)",
              background: "#191919"
            },
            footer: {
              display: "none"
            }
          }}
        />
      )}
    </>
  )
}
