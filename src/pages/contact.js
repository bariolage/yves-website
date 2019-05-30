import React, { useContext } from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Header, Layout } from "../components"
import {
  Article,
  Toggle,
  H2,
  Link,
  Paragraph,
  Section
} from "../components/elements"
import Context from "../components/store"

const ContactPage = () => {
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
              contact
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
          <H2>{edges[lang].node.sections[2]}</H2>
          <Link as={GatsbyLink} to="/">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        <Section>
          {edges[0].node.contact.map(e => (
            <Paragraph>{e}</Paragraph>
          ))}
        </Section>
      </Article>
    </Layout>
  )
}

export default ContactPage
