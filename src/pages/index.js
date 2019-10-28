import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Header, Gallery, Layout } from "../components";
import { Article, H2 } from "../components/elements";
import Context from "../components/store";

const IndexPage = () => {
  const context = useContext(Context);
  const lang = context.lang ? 1 : 0;
  const {
    contentUS: { edges: edgesUS },
    contentFR: { edges: edgesFR },
    content: { edges },
    infos: { edges: edgesInfo }
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
  );
  const images = [];
  edges.forEach((e, i) => {
    images.push({
      id: e.node.id,
      link: e.node.slug,
      fluid: e.node.thumbnail.fluid,
      figcaption: context.lang ? edgesFR[i].node.name : edgesUS[i].node.name
    });
  });

  return (
    <Layout>
      <Article>
        <Header>
          <H2>{edgesInfo[lang].node.sections[0]}</H2>
        </Header>
        <Gallery edges={images} />
      </Article>
    </Layout>
  );
};

export default IndexPage;
