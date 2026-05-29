import { notFound } from "next/navigation";
import { buildMeta } from "@/lib/seo";
import { SITE, AUTHOR } from "@/lib/site-config";
import { breadcrumbSchema, jsonLdScriptProps } from "@/lib/schema";
import { getAllSlugs, getPost } from "@/lib/blog/loader";
import { getRelatedPosts } from "@/lib/blog/related";
import { CATEGORY_BY_NAME } from "@/lib/blog/categories";
import { BlogPostShell } from "@/components/blog/BlogPostShell";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return buildMeta({
      title: "Post not found",
      description: "",
      path: `/blog/${slug}`,
    });
  }
  return buildMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: [post.category, ...post.tags, "Yashveer Labs"],
    ogImage: post.ogImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 4);
  const categorySlug =
    CATEGORY_BY_NAME[post.category]?.slug ?? post.categorySlug;

  const postingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}${post.ogImage}`,
    keywords: [post.category, ...post.tags].join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.jobTitle,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.category, path: `/blog/category/${categorySlug}` },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
      <script {...jsonLdScriptProps(postingSchema)} />
      <BlogPostShell post={post} related={related} />
    </>
  );
}
