import React from "react"
import { graphql} from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import { Flex } from "rebass"
import { Link, Toggle } from "../components/elements"
import styled from "styled-components"
import { Layout } from "../components"
import { FiX } from "react-icons/fi"

export default ({ data: { contentfulAsset }, pageContext }) => {
  const { previous, next, albumSlug } = pageContext
  return (
    <Layout photo>
      <Lightbox>
        <Figure>
          <Image
            objectFit="contain"
            objectPosition="50% 50%"
            fluid={contentfulAsset.fluid}
          />
        </Figure>
        <Footer>
          {previous && (
            <Button to={`${albumSlug}/${previous.fields.slug}`}>
              Prev
            </Button>
          )}
          <Link to={albumSlug} aria-label="retour">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
          {next && (
            <Button to={`${albumSlug}/${next.fields.slug}`}>
              Next
            </Button>
          )}
        </Footer>
      </Lightbox>
    </Layout>
  )
}

const Lightbox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const Figure = styled(Flex)`
  width: 100%;
  height: 80vh;
`
const Image = styled(Img)`
  width: 100%;
  height: 100%;
  margin: auto;
`
const Footer = styled.footer`
  width: 100%;
  height: 10vh;
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const Button = styled(Link)`
  color: black;
  text-transform: none;
  background: transparent;
  border: none;
`

export const photoQuery = graphql`
  query photoQuery($slug: String!) {
    contentfulAsset(fields: { slug: { eq: $slug } }) {
      id
      title
      fluid(maxWidth: 1200, quality: 100) {
        ...GatsbyContentfulFluid
      }
    }
  }
`
