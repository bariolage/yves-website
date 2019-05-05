import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import { Box } from "rebass"
import { Header, Layout, Gallery } from "../components"
import { Article, Toggle, H2, Link, P } from "../components/elements"
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
          <Link as={GatsbyLink} to="/">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        <Box as="section" p={2}>
          <P
            pb={4}
            dangerouslySetInnerHTML={{ __html: datoCmsTheme.content }}
          />
        </Box>
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
        fluid {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`
