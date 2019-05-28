import React, { forwardRef } from "react"
import { Heading } from "rebass"
import styled from "styled-components"

const H3 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h3"
      fontSize={3}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

export default props => <H3 {...props}/>
