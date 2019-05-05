import React from "react"
import { Link as GatsbyLink, graphql, useStaticQuery } from "gatsby"
import { Box } from "rebass"
import { Li, Link, P, Ul } from "./elements"

export default () => {
  const {
    allNavigationYaml: { edges }
  } = useStaticQuery(graphql`
    query navigationQuery {
      allNavigationYaml {
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  `)
  return (
    <Box as="nav">
      <Ul flexDirection="column" alignItems="flex-end">
        {edges.map(({ node }) => (
          <Li key={node.id}>
            {//external link
            node.url.startsWith("http") ? (
              <Link as="a" href={node.url} aria-label={node.title}>
                <P>{node.title}</P>
              </Link>
            ) : (
              //internal link
              <Link as={GatsbyLink} to={`/${node.url}`} aria-label={node.title}>
                <P>{node.title}</P>
              </Link>
            )}
          </Li>
        ))}
      </Ul>
    </Box>
  )
}
