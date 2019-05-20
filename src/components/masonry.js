import React, { forwardRef, useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { Flex } from "rebass"

const Masonry = styled(
  forwardRef((props, ref) => <Flex as="section" {...props} ref={ref} />)
)``

const Column = styled(
  forwardRef((props, ref) => <Flex as="section" {...props} ref={ref} />)
)`
  flex-direction: column;
  figure {
    margin: 1em;
  }
`

export default ({ children, gap, minWidth = 250 }) => {
  const cols = []
  const ref = useRef()
  const [numCols, setNumCols] = useState(1)

  const calcNumCols = () =>
    setNumCols(Math.floor(ref.current.offsetWidth / minWidth))

  const createCols = () => {
    for (let i = 0; i < numCols; i++) cols[i] = []
    children.forEach((child, i) => cols[i % numCols].push(child))
  }

  useEffect(() => {
    calcNumCols()
    window.onresize = calcNumCols
    return () => (window.onresize = null)
  })

  createCols()

  return (
    <Masonry ref={ref} gap={gap}>
      {Array(numCols)
        .fill()
        .map((el, i) => (
          <Column key={i} width={1 / numCols}>
            {cols[i]}
          </Column>
        ))}
    </Masonry>
  )
}
