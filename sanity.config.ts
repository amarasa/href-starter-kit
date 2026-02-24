import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { siteConfig } from "./site.config";

export default defineConfig({
  name: "default",
  title: siteConfig.name,

  projectId: siteConfig.sanity.projectId,
  dataset: siteConfig.sanity.dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
