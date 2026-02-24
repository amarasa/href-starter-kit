import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Post } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";

interface BlogPreviewProps {
  /** Array of recent posts to display (typically the latest 3) */
  posts: Post[];
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPreview({
  posts,
  title = "Latest Insights",
  subtitle,
}: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-heading"
      className="py-16 sm:py-20 lg:py-24 bg-background"
    >
      <Container>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="/blog"
          viewAllLabel="View All Posts"
          centered={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-150 group"
            >
              {/* Featured image */}
              <Link
                href={`/blog/${post.slug.current}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="relative aspect-video w-full bg-primary/5 overflow-hidden">
                  {post.featuredImage?.asset?._ref ? (
                    <Image
                      src={urlFor(post.featuredImage).width(800).height(450).url()}
                      alt=""
                      width={800}
                      height={450}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10" />
                  )}
                </div>
              </Link>

              <div className="p-6">
                {/* Category badge */}
                {post.categories && post.categories.length > 0 && (
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium rounded-full px-2.5 py-0.5 mb-3">
                    {post.categories[0]}
                  </span>
                )}

                <h3 className="text-lg font-bold font-heading text-text leading-snug">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded"
                  >
                    {post.title}
                  </Link>
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-text-muted leading-relaxed mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta row: date and read time */}
                <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
                  {post.publishDate && (
                    <time dateTime={post.publishDate}>
                      {formatDate(post.publishDate)}
                    </time>
                  )}

                  {post.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
