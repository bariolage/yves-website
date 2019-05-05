import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Header, Layout } from "../components"
import {
  Article,
  Toggle,
  H2,
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
    <Layout>
      <Article>
        <Header>
          <H2>{datoCmsAbout.title}</H2>
          <Link as={GatsbyLink} to="/">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        <Section>
          <P
            dangerouslySetInnerHTML={{
              __html: datoCmsAbout.contentNode.childMarkdownRemark.html
            }}
          />
        </Section>
      </Article>
    </Layout>
  )
}

export default AboutPage
