// /sanity/schemaTypes/article.ts
import { defineType, defineField } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    // Meta & SEO
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "If empty, will use the main title",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialShareImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended size: 1200x630px",
    }),

    // Publishing & Status
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "When this article was first published",
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description: "Mark as featured to highlight on homepage",
      initialValue: false,
    }),

    // Author & Category
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    // Slug & Tags
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "hero",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Important for accessibility and SEO",
        },
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      description: "Brief introduction or excerpt",
      validation: (Rule) => Rule.max(300),
    }),

    // Body Content
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          fields: [
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
          options: { hotspot: true },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Error", value: "error" },
                ],
              },
            },
            { name: "title", title: "Title", type: "string" },
            { name: "content", title: "Content", type: "text" },
          ],
        },
        {
          type: "object",
          name: "internalLink",
          title: "Internal Link",
          fields: [
            {
              name: "reference",
              title: "Reference",
              type: "reference",
              to: [{ type: "article" }, { type: "page" }],
            },
            { name: "linkText", title: "Link Text", type: "string" },
          ],
        },
        {
          type: "object",
          name: "video",
          title: "Video Embed",
          fields: [
            { name: "url", title: "Video URL", type: "url" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),

    // Table of Contents
    defineField({
      name: "showTableOfContents",
      title: "Show Table of Contents",
      type: "boolean",
      description: "Auto-generate from headings in body content",
      initialValue: false,
    }),

    // Conclusion
    defineField({
      name: "conclusion",
      title: "Conclusion",
      type: "text",
      validation: (Rule) => Rule.max(500),
    }),

    // Related Articles
    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      validation: (Rule) => Rule.max(3),
    }),

    // Gallery
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Image",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
        {
          type: "object",
          name: "galleryVideo",
          title: "Video",
          fields: [
            { name: "url", title: "Video URL", type: "url" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),

    // Quote
    defineField({
      name: "quote",
      title: "Featured Quote",
      type: "object",
      fields: [
        { name: "text", title: "Quote Text", type: "text" },
        { name: "author", title: "Author", type: "string" },
        { name: "authorTitle", title: "Author Title", type: "string" },
      ],
    }),

    // Newsletter & CTA
    defineField({
      name: "showNewsletterSignup",
      title: "Show Newsletter Signup",
      type: "boolean",
      description: "Display newsletter signup form at end of article",
      initialValue: true,
    }),
    defineField({
      name: "ctaBlocks",
      title: "Call-to-Action Blocks",
      type: "array",
      description: "Add one or more CTAs to display in the article",
      of: [{ type: "cta" }],
      validation: (Rule) => Rule.max(3),
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "hero",
      status: "status",
    },
    prepare(selection) {
      const { title, author, media, status } = selection;
      return {
        title: title,
        subtitle: author ? `by ${author} • ${status}` : status,
        media: media,
      };
    },
  },

  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
