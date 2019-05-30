import React, { useContext, useEffect } from "react"
import { Paragraph } from "../elements"
import styled from "styled-components"
import Context from "../store"

const Span = styled.span`
  opacity: 0.8;
  cursor: pointer;
  font-weight: ${props => props.bold && '400'};
  font-size: 15px;
`

export default () => {
  const context = useContext(Context)
  return (
    <Paragraph onClick={() => context.setLang(!context.lang)} textAlign="right" px={2}>
      <Span bold={!context.lang}>en</Span>
      <Span>|</Span>
      <Span bold={context.lang}>fr</Span>
    </Paragraph>
  )
}
