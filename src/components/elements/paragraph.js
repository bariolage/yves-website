import React, { forwardRef } from "react"
import { Text } from "rebass"
import styled from "styled-components"

const Paragraph = styled(
  forwardRef((props, ref) => (
    <Text
      {...props}
      as="p"
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
      fontSize={3}
    />
  ))
)`
  max-width: 32em;
  line-height: 1.4;
`

export default props => <Paragraph {...props} />
