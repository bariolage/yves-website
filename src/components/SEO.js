import React from "react"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const SEO = ({ albumData }, isa) => {
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

  const baseSchema = {
    "@context": "http://schema.org/",
    "@type": "WebSite",
    author: {
      "@type": "Person",
      name: base.author,
      sameAs: `https://www.instagram.com/${base.instagram}`
    },
    about: base.description,
    image: base.banner,
    name: base.title,
    url: base.siteUrl,
    alternateName: base.titleAlt
  }

  const albumSchema = {
    "@context": "http://schema.org/",
    "@type": "ImageGallery",
    datePublished: albumData.datePublished,
    description: albumData.description,
    image: albumData.banner,
    name: albumData.title,
    url: `${base.siteUrl}/${albumData.slug}`,
    author: {
      "@type": "Person",
      name: base.author,
      sameAs: `https://www.instagram.com/${base.instagram}`
    }
  }

  const schema = albumData ? [...baseSchema, ...albumSchema] : baseSchema

  const title = albumData.title || base.title
  const description = albumData.description || base.description
  const image = albumData.banner || base.banner
  const url = `${base.siteUrl}/${albumData.slug}` || base.siteUrl
  const siteLanguage = base.siteLanguage

  return (
    <>
      <Helmet>
        {/* General */}
        <html lang={siteLanguage} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />


        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    </>
  )
}

SEO.defaultProps = {
  isAlbum: false,
  albumData: {}
}

export default SEO
