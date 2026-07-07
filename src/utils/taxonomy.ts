import type { CollectionEntry } from "astro:content";
import { getSortedPosts } from "./getSortedPosts";
import { slugifyStr } from "./slugify";

export type TaxonomyItem = {
  name: string;
  slug: string;
  count: number;
};

export type TaxonomyField = "category" | "series" | "type";

const FALLBACK_CATEGORY = "其他";

const LABELS: Record<TaxonomyField, Record<string, string>> = {
  category: {
    "AI Engineering": "AI 工程",
    "AI Frontier": "AI 前沿",
    "Web & AI Tooling": "Web 与 AI 工具链",
    "Culture & Media": "文化与媒介",
    "Writing System": "写作系统",
  },
  series: {
    "Claude Code Notes": "Claude Code 笔记",
    "Codex Notes": "Codex 笔记",
    "CopilotKit Notes": "CopilotKit 笔记",
    "Hermes Notes": "Hermes 笔记",
    "TanStack Notes": "TanStack 笔记",
  },
  type: {},
};

export function getTaxonomyLabel(field: TaxonomyField, value: string) {
  return LABELS[field][value] ?? value;
}

function getFieldValue(post: CollectionEntry<"posts">, field: TaxonomyField) {
  const value = post.data[field];
  if (field === "category") return value || FALLBACK_CATEGORY;
  // series and type: skip posts that don't define the field
  if (!value) return "";
  return value;
}

export function getTaxonomyItems(
  posts: CollectionEntry<"posts">[],
  field: TaxonomyField
): TaxonomyItem[] {
  const counts = new Map<string, TaxonomyItem>();

  for (const post of getSortedPosts(posts)) {
    const rawName = getFieldValue(post, field);
    if (!rawName) continue;

    const slug = slugifyStr(rawName);
    const name = getTaxonomyLabel(field, rawName);
    const item = counts.get(slug);
    if (item) {
      item.count += 1;
    } else {
      counts.set(slug, { name, slug, count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, "zh-CN");
  });
}

export function getPostsByTaxonomy(
  posts: CollectionEntry<"posts">[],
  field: TaxonomyField,
  slug: string
) {
  return getSortedPosts(
    posts.filter(post => {
      const value = getFieldValue(post, field);
      return value && slugifyStr(value) === slug;
    })
  );
}

export function getCategoryItems(posts: CollectionEntry<"posts">[]) {
  return getTaxonomyItems(posts, "category");
}

export function getSeriesItems(posts: CollectionEntry<"posts">[]) {
  return getTaxonomyItems(posts, "series");
}

export function getTypeItems(posts: CollectionEntry<"posts">[]) {
  return getTaxonomyItems(posts, "type");
}
