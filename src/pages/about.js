import React, { useContext } from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Header, Layout, Gallery } from "../components"
import {
  Article,
  Toggle,
  H2,
  Link,
  Section,
  Paragraph
} from "../components/elements"
import Context from "../components/store"

const AboutPage = () => {
  const context = useContext(Context)
  const lang = context.lang ? 1 : 0
  const {
    allContentfulInformations: { edges }
  } = useStaticQuery(
    graphql`
      query {
        allContentfulInformations {
          edges {
            node {
              id
              sections
              biographie {
                childMarkdownRemark {
                  html
                }
              }
              exposititions {
                id
                title
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    `
  )
  const images = []
  edges[0].node.exposititions.forEach(e => {
    images.push({
      id: e.id,
      fluid: e.fluid,
      figcaption: e.title
    })
  })
  return (
    <Layout>
      <Article>
        <Header>
          <H2>{edges[lang].node.sections[1]}</H2>
          <Link as={GatsbyLink} to="/">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        <Section>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: edges[lang].node.biographie.childMarkdownRemark.html
            }}
          />
        </Section>
        <H2 py={[2,3,4,5]}>Expositions</H2>
        <Gallery isAlbum edges={images} />
      </Article>
    </Layout>
  )
}

export default AboutPage
