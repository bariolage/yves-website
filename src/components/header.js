import React from "react"
import { Flex } from "rebass"

export default ({ children }) => (
  <Flex
    as="header"
    width={1}
    p={2}
    justifyContent="space-between"
    alignItems="baseline"
  >
    {children}
  </Flex>
)
