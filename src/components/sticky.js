import React, { useRef, useEffect, useState } from "react"
import { Box } from "rebass"

export default ({ children }) => {
  const stickyRef = useRef()
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const { top } = stickyRef.current.getBoundingClientRect()
    window.addEventListener("scroll", () => {
      window.pageYOffset > top ? setSticky(true) : setSticky(false)
      return () => setSticky(false)
    })
  }, [stickyRef])

  return (
    <Box
      width={1}
      p={sticky ? 2 : 0}
      ref={stickyRef}
      bg="white"
      style={{
        position: sticky && "fixed",
        top: sticky && "0",
        left: sticky && "0",
        right: sticky && "0",
        zIndex: "1",
        maxWidth: "60em",
        margin: "0 auto",
        transition: "0.3s"
      }}
    >
      {children}
    </Box>
  )
}
