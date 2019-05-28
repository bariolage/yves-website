import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Header, Layout } from "../components"
import { Article, Toggle, H2, Link, Paragraph, Section } from "../components/elements"

const ContactPage = () => {
  const { datoCmsContact } = useStaticQuery(
    graphql`
      query {
        datoCmsContact {
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
          <H2>Contact</H2>
          <Link as={GatsbyLink} to="/">
            <Toggle>
              <FiX size={16} />
            </Toggle>
          </Link>
        </Header>
        <Section>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: datoCmsContact.contentNode.childMarkdownRemark.html
            }}
          />
        </Section>
      </Article>
    </Layout>
  )
}

export default ContactPage
