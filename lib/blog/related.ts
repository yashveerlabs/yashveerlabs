import { BlogPost, getAllPosts } from "./loader";

export function getRelatedPosts(slug: string, count = 4): BlogPost[] {
  const all = getAllPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) return [];

  const others = all.filter((p) => p.slug !== slug);

  const scored = others.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 5;
    const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
    score += sharedTags * 2;
    return { post: p, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.post.date < b.post.date ? 1 : -1;
  });

  const top = scored.filter((s) => s.score > 0).slice(0, count);
  if (top.length >= count) return top.map((s) => s.post);

  const fillers = others
    .filter((p) => !top.find((t) => t.post.slug === p.slug))
    .slice(0, count - top.length);

  return [...top.map((s) => s.post), ...fillers];
}
