import { readdirSync } from 'node:fs';
import { join } from 'node:path';

// Get all blog posts for static params
function getBlogSlugs() {
  const postsDirectory = join(process.cwd(), 'src/content/blog');
  return readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const awaitedParams = await params;
  const { default: Content } = await import(`@/content/blog/${awaitedParams.slug}.mdx`);
  return <Content />;
}

export function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

// Disable dynamic params - only allow pre-rendered routes
export const dynamicParams = false;