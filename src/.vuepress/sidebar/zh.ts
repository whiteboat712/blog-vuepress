import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "iconfont icon-article",
      prefix: "posts/",
      collapsible: true,
      children: [
        {
          icon: "iconfont icon-code",
          text: "代码训练",
          prefix: "coding-training/",
          collapsible: true,
          children: [
            {
              text: "比赛",
              prefix: "contest/",
              collapsible: true,
              children: "structure",
            },
            {
              text: "训练",
              prefix: "training/",
              collapsible: true,
              children: "structure",
            },
          ],
        },
        {
          icon: "iconfont icon-overflow",
          text: "生活",
          collapsible: true,
          prefix: "life/",
          children: "structure",
        },
        {
          icon: "iconfont icon-note",
          text: "笔记",
          prefix: "notes/",
          collapsible: true,
          children: [
            {
              text: "算法",
              prefix: "algorithm/",
              collapsible: true,
              children: "structure",
            },
            {
              text: "数据结构",
              prefix: "data-structure/",
              collapsible: true,
              children: "structure",
            },
            {
              text: "探索",
              prefix: "explore/",
              collapsible: true,
              children: "structure",
            }
          ],
        },
      ],
    },
    {
      text: "项目",
      icon: "iconfont icon-workingDirectory",
      prefix: "projects/",
      collapsible: true,
      children: [
        ""
      ],
    },
    "intro",
  ],
});
