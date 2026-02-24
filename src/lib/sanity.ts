import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { siteConfig } from "@/../site.config";

export const client = createClient({
  projectId: siteConfig.sanity.projectId,
  dataset: siteConfig.sanity.dataset,
  apiVersion: siteConfig.sanity.apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder({
  projectId: siteConfig.sanity.projectId,
  dataset: siteConfig.sanity.dataset,
});

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Types
export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string;
  shortDescription: string;
  description: string;
  image?: { asset: { _ref: string } };
  features: string[];
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  credentials: string[];
  bio: string;
  photo?: { asset: { _ref: string } };
  specializations: string[];
  email: string;
  linkedin: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientTitle: string;
  company: string;
  quote: string;
  rating: number;
  photo?: { asset: { _ref: string } };
  featured: boolean;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishDate: string;
  excerpt: string;
  content: string;
  featuredImage?: { asset: { _ref: string } };
  categories: string[];
  tags: string[];
  readTime: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Queries
export async function getAllServices(): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, icon, shortDescription, description, image, features, order
    }`
  );
}

export async function getService(slug: string): Promise<Service | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, title, slug, icon, shortDescription, description, image, features, order
    }`,
    { slug }
  );
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, slug, title, credentials, bio, photo, specializations, email, linkedin, order
    }`
  );
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] {
      _id, clientName, clientTitle, company, quote, rating, photo, featured
    }`
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && publishDate <= now()] | order(publishDate desc) {
      _id, title, slug, publishDate, excerpt, featuredImage, categories, tags, readTime
    }`
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishDate, excerpt, content, featuredImage, categories, tags, readTime
    }`,
    { slug }
  );
}

export async function getAllFaqs(): Promise<FAQ[]> {
  return client.fetch(
    `*[_type == "faq"] | order(order asc) {
      _id, question, answer, category, order
    }`
  );
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      companyName, tagline, logo, phone, email, address, socialLinks, businessHours
    }`
  );
}
