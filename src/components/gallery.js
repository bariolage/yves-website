import React, { forwardRef, useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import { Box, Text } from "rebass"
import styled from "styled-components"
import Lightbox from "react-images"
import Masonry from "./masonry"
import InView from "./inview"

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

const Gallery = ({ edges, columns, withLighbox, ...rest }) => {
  const [images, setImages] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length === 0 && edges) {
      setImages(
        edges.map((e, i) => ({
          index: i,
          height: e.fluid.height,
          width: e.fluid.width,
          src: e.fluid.src,
          srcSet: e.fluid.srcSet,
          fluid: e.fluid,
          caption: e.figcaption
        }))
      )
    }
  }, [images])

  return (
    <>
      <Masonry>
        {edges.map((edge, index) => (
          <Figure
            key={edge.id}
            onClick={() => {
              setCurrent(index)
              setOpen(true)
            }}
            withLighbox={withLighbox}
          >
            {withLighbox ? (
              <Img fluid={edge.fluid} alt={edge.figcaption} />
            ) : (
              <Link to={edge.link} aria-label={edge.figcaption}>
                <Img fluid={edge.fluid} alt={edge.figcaption} />
                <Figcaption>{edge.figcaption}</Figcaption>
              </Link>
            )}
          </Figure>
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
          //width={2000}
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

Gallery.defaultProps = {
  withLighbox: false
}

export default Gallery
