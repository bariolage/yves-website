import React, { useContext } from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import { Box } from "rebass"
import { Header, Layout, Gallery } from "../components"
import {
  Article,
  Toggle,
  H2,
  Link,
  Paragraph,
  Section
} from "../components/elements"
import { FiX } from "react-icons/fi"
import Context from "../components/store"

const AlbumTemplate = ({ data: { contentFR, contentUS } }) => {
  const context = useContext(Context)
  const edges = contentFR.edges[0]

  const images = []
  edges.node.gallery.forEach(e => {
    images.push({
      id: e.id,
      fluid: e.fluid,
      figcaption: e.title
    })
  })

  const seo = {
    title: edges.node.name,
    description: edges.node.name,
    banner: edges.node.thumbnail.file.url,
    datePublished: edges.node.date,
    slug: edges.node.slug
  }

  return (
    <Layout albumData={seo}>
      <Article>
        <Header>
          <H2>
            {context.lang ? edges.node.name : contentUS.edges[0].node.name}
          </H2>
          <Link as={GatsbyLink} to="/" aria-label="retour">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        {/* datoCmsTheme.content && (
          <Section p={2}>
            <Paragraph
              pb={4}
              dangerouslySetInnerHTML={{ __html: datoCmsTheme.content }}
            />
          </Section>
        ) */}
        <Gallery withLighbox edges={images} />
      </Article>
    </Layout>
  )
}

export default AlbumTemplate

export const albumQuery = graphql`
  query AlbumQuery($id: String) {
    contentFR: allContentfulTheme(
      filter: { node_locale: { eq: "fr" }, contentful_id: { eq: $id } }
    ) {
      edges {
        node {
          id
          slug
          name
          date(formatString: "YY-MM-DD")
          thumbnail {
            file {
              url
            }
          }
          gallery {
            id
            title
            fluid(maxWidth: 300) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    contentUS: allContentfulTheme(
      filter: { node_locale: { eq: "en-US" }, contentful_id: { eq: $id } }
    ) {
      edges {
        node {
          name
        }
      }
    }
  }
`
