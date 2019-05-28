import React, { forwardRef } from "react"
import { Flex } from "rebass"
import styled from "styled-components"

const Toggle = styled(
  forwardRef((props, ref) => (
    <Flex {...props} as="span" bg="primary" color="secondary" ref={ref} />
  ))
)`
  padding: 0;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`

export default props => <Toggle {...props} />
