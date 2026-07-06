import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://eriklee-blog.pages.dev/",
    title: "Erik Lee",
    description: "AI engineering notes, agent systems, and long-form technical essays.",
    author: "Erik Lee",
    profile: "https://github.com/eriklee1895",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/eriklee1895/eriklee-blog/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/eriklee1895/eriklee-blog" },
    { name: "x",        url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail",     url: "mailto:yourmail@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
