import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/../site.config";
import { getAllPosts, urlFor, type Post } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: `Read the latest insights, tips, and financial guidance from the ${siteConfig.name} team.`,
};

export const revalidate = 60;

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              Our Blog
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              Stay informed with the latest tax tips, financial strategies, and
              business insights from our team of experts.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug.current}`} tabIndex={-1} aria-hidden="true">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={urlFor(post.featuredImage).width(600).height(340).url()}
                          alt=""
                          width={600}
                          height={340}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.categories?.[0] && (
                        <Badge variant="primary">{post.categories[0]}</Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{post.readTime || 5} min read</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold font-heading text-text mb-2 line-clamp-2">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-text-muted line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <time
                      dateTime={post.publishDate}
                      className="text-xs text-text-muted"
                    >
                      {formatDate(post.publishDate)}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-center">
              Blog posts will appear here once content is added to the CMS.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
