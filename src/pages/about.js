import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Layout } from "../components"
import {
  Article,
  Button,
  H2,
  Header,
  Link,
  P,
  Section
} from "../components/elements"

const AboutPage = props => {
  const { datoCmsAbout } = useStaticQuery(
    graphql`
      query {
        datoCmsAbout {
          title
          contentNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    `
  )
  return (
    <Layout location={props.location}>
      <Article>
        <Header>
          <H2>{datoCmsAbout.title}</H2>
          <Link as={GatsbyLink} to="/">
            <Button>
              <FiX size={16} />
            </Button>
          </Link>
        </Header>
        <Section>
          <P dangerouslySetInnerHTML={{ __html: datoCmsAbout.contentNode.childMarkdownRemark.html }} />
        </Section>
      </Article>
    </Layout>
  )
}

export default AboutPage
