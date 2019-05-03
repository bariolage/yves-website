import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import { FiX } from "react-icons/fi"
import { Layout, SEO } from "../components"
import {
  Article,
  Button,
  H2,
  Header,
  Link,
  P,
  Section
} from "../components/elements"

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
      <SEO />
      <Article>
        <Header>
          <H2>Contact</H2>
          <Link as={GatsbyLink} to="/">
            <Button>
              <FiX size={16} />
            </Button>
          </Link>
        </Header>
        <Section>
          <P
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
