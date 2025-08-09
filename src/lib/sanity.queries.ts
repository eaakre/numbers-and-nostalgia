export const articleQueries = {
  // Get all published articles for homepage
  homepage: `
    *[_type == "article" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      intro,
      hero {
        asset->{url},
        alt
      },
      author->{
        name,
        slug
      },
      category->{
        name,
        slug,
        color
      },
      publishedAt,
      featured
    }
  `,

  // Get single article by slug
  bySlug: `
    *[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      seoTitle,
      seoDescription,
      slug,
      intro,
      body,
      hero {
        asset->{url},
        alt
      },
      author->{
        _id,
        name,
        slug,
        avatar {
          asset->{url}
        },
        bio
      },
      category->{
        name,
        slug,
        color
      },
      tags[]->{
        name,
        slug
      },
      publishedAt,
      conclusion,
      quote,
      gallery[] {
        _type,
        _type == "galleryImage" => {
          image {
            asset->{url}
          },
          caption,
          alt
        },
        _type == "galleryVideo" => {
          url,
          caption
        }
      },
      relatedArticles[]->{
        _id,
        title,
        slug,
        intro,
        hero {
          asset->{url},
          alt
        },
        author->{name},
        publishedAt
      },
      ctaBlocks,
      showNewsletterSignup,
      showTableOfContents
    }
  `,

  // Get articles by category
  byCategory: `
    *[_type == "article" && status == "published" && category->slug.current == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      intro,
      hero {
        asset->{url},
        alt
      },
      author->{name},
      publishedAt
    }
  `,

  // Get articles by tag
  byTag: `
    *[_type == "article" && status == "published" && $tag in tags[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      intro,
      hero {
        asset->{url},
        alt
      },
      author->{name},
      publishedAt
    }
  `,

  // Get articles by author
  byAuthor: `
    *[_type == "article" && status == "published" && author->slug.current == $author] | order(publishedAt desc) {
      _id,
      title,
      slug,
      intro,
      hero {
        asset->{url},
        alt
      },
      publishedAt
    }
  `,
};
