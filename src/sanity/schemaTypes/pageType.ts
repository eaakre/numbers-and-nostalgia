// /sanity/schemaTypes/page.ts
import { defineType, defineField } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "showInNavigation",
      title: "Show in Navigation",
      type: "boolean",
      description: "Display this page in the main navigation",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
