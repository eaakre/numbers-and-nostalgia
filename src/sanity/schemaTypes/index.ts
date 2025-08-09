import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { authorType } from "./authorType";
import { articleType } from "./articleType";
import { tagType } from "./tagType";
import { pageType } from "./pageType";
import { cta } from "./objects/cta";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, articleType, tagType, categoryType, authorType, cta],
};
