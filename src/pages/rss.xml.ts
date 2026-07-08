import rss from "@astrojs/rss";
import { getAllPosts } from "@/lib/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: "Erik Lee",
    description: "AI 工程、Agent 系统、编程工具与技术写作的长期笔记。",
    site: context.site ?? "https://eriklee-blog.pages.dev/",
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: `/posts/${post.id.replace(/\.(md|mdx)$/, "")}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
