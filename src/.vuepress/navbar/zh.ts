import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "文章",
    icon: "iconfont icon-article",
    link: "posts/",
  },
  {
    text: "项目",
    icon: "iconfont icon-workingDirectory",
    link: "projects/",
  },
  "intro",
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
