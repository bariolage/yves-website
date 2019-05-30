import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Header, Gallery, Layout } from "../components"
import { Article, Toggle, H2, H3, Link, Section } from "../components/elements"
import { FiGrid, FiList } from "react-icons/fi"
import Img from "gatsby-image"
import Context from "../components/store"

const IndexPage = () => {
  const context = useContext(Context)
  const lang = context.lang ? 1 : 0
  const {
    contentUS: { edges: edgesUS },
    contentFR: { edges: edgesFR },
    content: { edges },
    infos: { edges: edgesInfo },
  } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { regex: "/banner/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        infos: allContentfulInformations {
          edges {
            node {
              sections
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        contentUS: allContentfulTheme(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          edges {
            node {
              id
              name
            }
          }
        }
        contentFR: allContentfulTheme(filter: { node_locale: { eq: "fr" } }) {
          edges {
            node {
              id
              name
            }
          }
        }
        content: allContentfulTheme(filter: { node_locale: { eq: "fr" } }) {
          edges {
            node {
              id
              slug
              thumbnail {
                id
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
  edges.forEach((e, i) => {
    images.push({
      id: e.node.id,
      link: e.node.slug,
      fluid: e.node.thumbnail.fluid,
      figcaption: context.lang ? edgesFR[i].node.name : edgesUS[i].node.name
    })
  })

  return (
    <Layout>
      <Article>
        <Header>
          <H2>{edgesInfo[lang].node.sections[0]}</H2>
          <Toggle onClick={() => context.setList(!context.list)}>
            {context.list ? <FiGrid size={16} /> : <FiList size={16} />}
          </Toggle>
        </Header>
        {context.list ? (
          <Section style={{ position: "relative" }} alignItems="center">
            <figure style={{ paddingBottom: "2em" }}>
              <Img
                style={{ height: "10em", width: "30em", maxWidth: "100%" }}
                fluid={edgesInfo[lang].node.image.fluid}
                alt="yves"
              />
            </figure>
            {images.map(e => (
              <Link to={e.link} key={e.id}>
                <H3 py={1}>{e.figcaption}</H3>
              </Link>
            ))}
          </Section>
        ) : (
          <Gallery edges={images} />
        )}
      </Article>
    </Layout>
  )
}

export default IndexPage
