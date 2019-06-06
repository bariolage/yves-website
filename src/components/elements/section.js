import React, { forwardRef } from "react"
import { Flex } from "rebass"
import styled from "styled-components"

const Section = styled(
  forwardRef((props, ref) => (
    <Flex
      {...props}
      as="section"
      flexDirection="column"
      px={[2, 4, 6]}
      p={2}
      py={[2,3,4]}
      ref={ref}
    />
  ))
)``

export default props => <Section {...props} />
