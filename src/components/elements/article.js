import React, { forwardRef } from "react"
import { Flex } from "rebass"
import styled from "styled-components"

const Article = styled(
  forwardRef((props, ref) => (
    <Flex {...props} as="article" width={1} flexDirection="column" ref={ref} />
  ))
)``

export default props => <Article {...props} />
