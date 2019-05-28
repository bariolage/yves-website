import React, { forwardRef } from "react"
import { Heading } from "rebass"
import styled from "styled-components"

const H2 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h2"
      fontSize={[3,4,5]}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

export default props => <H2 {...props}/>
