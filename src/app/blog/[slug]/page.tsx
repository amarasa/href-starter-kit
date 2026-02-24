import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/../site.config";
import { getPost, getAllPosts, urlFor, type Post } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BlogPostSchema } from "@/components/seo/structured-data";
import { CtaSection } from "@/components/sections/cta-section";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || post.content?.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  let relatedPosts: Post[] = [];
  try {
    const allPosts = await getAllPosts();
    relatedPosts = allPosts
      .filter((p) => p._id !== post._id)
      .slice(0, 3);
  } catch {
    // Sanity not populated yet
  }

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : undefined;

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.excerpt || ""}
        publishDate={post.publishDate}
        url={`${siteConfig.seo.siteUrl}/blog/${slug}`}
        imageUrl={imageUrl}
      />

      <article>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
          <Container>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Blog
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {post.categories?.map((cat) => (
                  <Badge key={cat} variant="accent">{cat}</Badge>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-6 text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={post.publishDate}>
                    {formatDate(post.publishDate)}
                  </time>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="-mt-8 relative z-10">
            <Container>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(630).url()}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </Container>
          </div>
        )}

        {/* Content */}
        <section className="py-12 sm:py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              {post.content && (
                <div className="prose prose-lg max-w-none text-text-muted leading-relaxed">
                  {post.content.split("\n").map((paragraph, i) =>
                    paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                  )}
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="primary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-surface">
          <Container>
            <h2 className="text-2xl font-bold font-heading text-text mb-8 text-center">
              More from Our Blog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold font-heading text-text mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="text-sm text-text-muted line-clamp-2">
                      {related.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        headline="Need Professional Financial Guidance?"
        subtitle="Our team is ready to help you navigate your financial challenges."
        buttonText="Get in Touch"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
