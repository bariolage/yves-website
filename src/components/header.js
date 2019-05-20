import React, { useRef, useLayoutEffect, useEffect, useState } from "react"
import { Box, Flex } from "rebass"
import { useSpring, animated } from "react-spring"

export default ({ children }) => {
  return (
    <Flex
      as="header"
      width={1}
      p={2}
      justifyContent="space-between"
      alignItems="baseline"
      bg="white"
    >
      {children}
    </Flex>
  )
}
