import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box } from "rebass"
import { Li, Link, P, Ul } from "./elements"

export default ({ navLinks }) => (
  <Box as="nav">
    <Ul flexDirection="column" alignItems="flex-end">
      {navLinks.map(({ node }) => (
        <Li key={node.id}>
          {//external link
          node.url.startsWith("http") ? (
            <Link as="a" href={node.url}>
              <P>{node.title}</P>
            </Link>
          ) : (
            //internal link
            <Link as={GatsbyLink} to={`/${node.url}`}>
              <P>{node.title}</P>
            </Link>
          )}
        </Li>
      ))}
    </Ul>
  </Box>
)

