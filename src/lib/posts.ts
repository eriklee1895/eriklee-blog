import { getCollection, type CollectionEntry } from "astro:content";
import { slugify } from "./utils";

export type Post = CollectionEntry<"posts">;

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) =>
      b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  );
}

export function getPostSlug(post: Post): string {
  return post.id.replace(/\.(md|mdx)$/, "");
}

export function getPostUrl(post: Post): string {
  return `/posts/${getPostSlug(post)}/`;
}

export type TaxonomyGroup = { name: string; slug: string; count: number; posts: Post[] };

function groupBy(posts: Post[], field: "category" | "series"): TaxonomyGroup[] {
  const map = new Map<string, TaxonomyGroup>();
  for (const post of posts) {
    const raw = post.data[field];
    if (!raw) continue;
    const slug = slugify(raw);
    const existing = map.get(slug);
    if (existing) {
      existing.count++;
      existing.posts.push(post);
    } else {
      map.set(slug, { name: raw, slug, count: 1, posts: [post] });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getCategories(posts: Post[]) { return groupBy(posts, "category"); }
export function getSeries(posts: Post[]) { return groupBy(posts, "series"); }

export function getAllTags(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(p => p.data.tags.map(slugify).includes(tag));
}

export function getPostsByCategory(posts: Post[], categorySlug: string): Post[] {
  return posts.filter(p => slugify(p.data.category ?? "") === categorySlug);
}

export function getPostsBySeries(posts: Post[], seriesSlug: string): Post[] {
  return posts.filter(p => p.data.series && slugify(p.data.series) === seriesSlug);
}
