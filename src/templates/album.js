import React from "react"
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

const AlbumTemplate = ({ data: { datoCmsTheme } }) => {
  const images = []
  datoCmsTheme.gallery.forEach(e => {
    images.push({
      id: e.id,
      fluid: e.fluid,
      figcaption: e.title
    })
  })

  const seo = {
    title: datoCmsTheme.albumInfo.title,
    description: datoCmsTheme.albumInfo.description,
    banner: datoCmsTheme.albumInfo.image.url,
    datePublished: datoCmsTheme.date,
    slug: datoCmsTheme.slug
  }

  return (
    <Layout albumData={seo}>
      <Article>
        <Header>
          <H2>{datoCmsTheme.name}</H2>
          <Link as={GatsbyLink} to="/" aria-label="retour">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        {datoCmsTheme.content && (
          <Section p={2}>
            <Paragraph
              pb={4}
              dangerouslySetInnerHTML={{ __html: datoCmsTheme.content }}
            />
          </Section>
        )}
        <Gallery withLighbox edges={images} />
      </Article>
    </Layout>
  )
}

export default AlbumTemplate

export const albumQuery = graphql`
  query AlbumQuery($id: String) {
    datoCmsTheme(id: { eq: $id }) {
      id
      slug
      name
      date
      albumInfo {
        title
        description
        image {
          url
        }
      }
      gallery {
        id
        title
        fluid(maxWidth: 300) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`
