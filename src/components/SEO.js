import React from "react"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const SEO = ({ data }, isAlbum) => {
  const {
    site: { siteMetadata: base }
  } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            siteUrl
            title
            titleAlt
            description
            banner
            icon
            siteLanguage
            author
            instagram
          }
        }
      }
    `
  )

  const baseSchema = [
    {
      "@context": "http://schema.org/",
      "@type": "WebSite",
      author: {
        "@type": "Person",
        name: base.author,
        sameAs: `https://www.instagram.com/${base.instagram}`
      },
      description: base.description,
      image: base.banner,
      name: base.title,
      url: base.siteUrl,
      alternateName: base.titleAlt
    }
  ]

  const schema = isAlbum
    ? [
        ...baseSchema,
        {
          "@context": "http://schema.org/",
          "@type": "ImageGallery",
          datePublished: data.datePublished,
          description: data.description,
          image: data.banner,
          name: data.title,
          url: `${base.siteUrl}/${data.slug}`,
          author: {
            "@type": "Person",
            name: base.author,
            sameAs: `https://www.instagram.com/${base.instagram}`
          }
        }
      ]
    : baseSchema

  const title = data.title || base.title
  const description = data.description || base.description
  const image = data.banner || base.banner
  const url = `${base.siteUrl}/${data.slug}` || base.siteUrl
  const siteLanguage = base.siteLanguage

  return (
    <>
      <Helmet>
        {/* General tags */}
        <html lang={siteLanguage} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {isAlbum ? <meta property="og:type" content="photography" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    </>
  )
}

export default SEO
