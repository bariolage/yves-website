import React, { forwardRef, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Box, Flex, Text } from "rebass"
import { Paragraph, Link } from "../elements"
import Context from "../store"

const Ul = styled(
  forwardRef((props, ref) => <Flex {...props} as="ul" ref={ref} />)
)``

const Li = styled(
  forwardRef((props, ref) => <Text {...props} as="li" ref={ref} />)
)`
  list-style: none;
`

export default () => {
  const context = useContext(Context)
  const {
    allNavigationYaml: { edges }
  } = useStaticQuery(graphql`
    query navigationQuery {
      allNavigationYaml {
        edges {
          node {
            id
            title
            titleFr
            url
          }
        }
      }
    }
  `)
  return (
    <Box as="nav" ml="auto">
      <Ul flexDirection="column" alignItems="flex-end">
        {edges.map(({ node }) => {
          const title = context.lang ? node.titleFr : node.title
          return (
            <Li key={node.id}>
              {//external link

              node.url.startsWith("http") ? (
                <Link href={node.url} aria-label={title}>
                  <Paragraph>{title}</Paragraph>
                </Link>
              ) : (
                //internal link
                <Link to={`/${node.url}`} aria-label={title}>
                  <Paragraph>{title}</Paragraph>
                </Link>
              )}
            </Li>
          )
        })}
      </Ul>
    </Box>
  )
}
