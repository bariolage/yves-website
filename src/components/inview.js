import React from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"

export default ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })
  const props = useSpring({
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(10%)"
    }
  })

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}
