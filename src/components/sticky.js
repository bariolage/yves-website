import React, { useRef, useEffect, useState } from "react"
import { Box } from "rebass"

const fixed = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  zIndex: "1",
  maxWidth: "60em",
  margin: "0 auto",
  transition: "0.3s"
}

export default ({ children }) => {
  const ref = useRef()
  const [isStick, setSticky] = useState(false)

  useEffect(() => {
    const { top } = ref.current.getBoundingClientRect()
    window.addEventListener("scroll", () => {
      window.pageYOffset > top ? setSticky(true) : setSticky(false)
      return () => setSticky(false)
    })
  }, [ref])

  return (
    <Box
      width={1}
      p={isStick ? 2 : 0}
      ref={ref}
      bg="white"
      css={isStick && fixed}
    >
      {children}
    </Box>
  )
}
