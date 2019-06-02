const path = require(`path`)
const GithubSlugger = require("github-slugger")
const slugger = new GithubSlugger()

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "ContentfulAsset") {
    const assetSlug = slugger.slug(node.title)
    createNodeField({
      name: "slug",
      node,
      value: assetSlug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulTheme(filter: { node_locale: { eq: "fr" } }) {
              edges {
                node {
                  contentful_id
                  slug
                  gallery {
                    id
                    title
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }
        result.data.allContentfulTheme.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/album.js`),
            context: { id: node.contentful_id }
          })

          node.gallery.forEach((e, index) => {
            const next =
              index === node.gallery.length - 1 ? null : node.gallery[index + 1]
            const previous = index === 0 ? null : node.gallery[index - 1]
            const albumSlug = node.slug
            createPage({
              path: `${node.slug}/${e.fields.slug}`,
              component: path.resolve(`./src/templates/photo.js`),
              context: {
                slug: e.fields.slug,
                previous,
                next,
                albumSlug
              }
            })
          })
        })
      })
    )
  })
}
