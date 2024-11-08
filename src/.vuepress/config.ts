import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog-vuepress/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "StarVoice",
      description: "星音的博客",
    },
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
