import React, { forwardRef } from "react"
import {
  Button as RebassButton,
  Flex,
  Heading,
  Link as RebassLink,
  Text
} from "rebass"
import styled from "styled-components"

const Article = styled(
  forwardRef((props, ref) => (
    <Flex {...props} as="article" width={1} flexDirection="column" ref={ref} />
  ))
)``
const Button = styled(
  forwardRef((props, ref) => (
    <RebassButton {...props} bg="primary" color="secondary" ref={ref} />
  ))
)`
  width: fit-content;
  padding: 0;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`

const H1 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h1"
      fontSize={[5,6,7]}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

const H2 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h2"
      fontSize={[3,4,5]}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

const H3 = styled(
  forwardRef((props, ref) => (
    <Heading
      {...props}
      as="h3"
      fontSize={3}
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)``

const Header = styled(
  forwardRef((props, ref) => (
    <Flex
      {...props}
      as="header"
      width={1}
      p={2}
      justifyContent="space-between"
      alignItems="baseline"
      ref={ref}
    />
  ))
)``

const Li = styled(
  forwardRef((props, ref) => <Text {...props} as="li" ref={ref} />)
)`
  list-style: none;
`

const Link = styled(
  forwardRef((props, ref) => <RebassLink {...props} fontSize={1} ref={ref} />)
)`
  display: block;
  width: fit-content;
  text-decoration: none;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`

const P = styled(
  forwardRef((props, ref) => (
    <Text
      {...props}
      as="p"
      fontWeight={"body"}
      fontFamily="sUI"
      color="secondary"
      ref={ref}
    />
  ))
)`
  max-width: 32em;
  line-height: 1.4;
`

const Section = styled(
  forwardRef((props, ref) => (
    <Flex {...props} as="section" flexDirection="column" px={[2,4,6]} p={2} ref={ref} />
  ))
)``

const Ul = styled(
  forwardRef((props, ref) => <Flex {...props} as="ul" ref={ref} />)
)``

export { Article, Button, H1, H2, H3, Header, Li, Link, P, Section, Ul }
