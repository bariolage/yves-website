import React, { useContext, useEffect } from "react"
import { Paragraph } from "../elements"
import styled from "styled-components"
import Context from "../store"

const Span = styled.span`
  opacity: 0.8;
  cursor: pointer;
  font-weight: ${props => props.bold && "400"};
  font-size: 15px;
`

export default () => {
  const { lang, setLang } = useContext(Context)
  return (
    <Paragraph onClick={() => setLang(!lang)} textAlign="right" px={2}>
      <Span bold={!lang}>en</Span>
      <Span>|</Span>
      <Span bold={lang}>fr</Span>
    </Paragraph>
  )
}
