import React, { forwardRef } from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as RebassLink } from "rebass"
import styled from "styled-components"
import { style, fontFamily } from "styled-system"

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration"
})

const Link = styled(
  forwardRef((props, ref) => (
    <RebassLink
      as={props.href ? "a" : GatsbyLink}
      {...props}
      ref={ref}
      fontSize={1} 
    />
  ))
)`
  display: block;
  opacity: 0.8;
  ${textDecoration};
  ${fontFamily};
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`

export default props => (
  <Link {...props} textDecoration="none" />
)
