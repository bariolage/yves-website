import React, { forwardRef } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Box, Flex, Text } from "rebass"
import { Paragraph, Link } from "../elements"

const Ul = styled(
  forwardRef((props, ref) => <Flex {...props} as="ul" ref={ref} />)
)``

const Li = styled(
  forwardRef((props, ref) => <Text {...props} as="li" ref={ref} />)
)`
  list-style: none;
`

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
    <Box as="nav" ml="auto">
      <Ul flexDirection="column" alignItems="flex-end">
        {edges.map(({ node }) => (
          <Li key={node.id}>
            {//external link
            node.url.startsWith("http") ? (
              
              <Link href={node.url} aria-label={node.title}>
                <Paragraph>{node.title}</Paragraph>
              </Link>
            ) : (
              //internal link
              <Link to={`/${node.url}`} aria-label={node.title}>
                <Paragraph>{node.title}</Paragraph>
              </Link>
            )}
          </Li>
        ))}
      </Ul>
    </Box>
  )
}
