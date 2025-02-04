import { Metadata } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';

type Params = Promise<{ slug: string }>;

function getBlogSlugs() {
  const postsDirectory = join(process.cwd(), 'src/content/blog');
  return readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

export default async function Page({ params }: { params: Params }) {
  try {
    const { slug } = await params;
    const { default: Content } = await import(`../../../content/blog/${slug}.mdx`);
    return <Content />;
  } catch (error) {
    console.error('Failed to load blog post:', error);
    notFound();
  }
}

export function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Blog Post: ${slug}`,
    description: `Details about blog post ${slug}`
  };
}

export const dynamicParams = false;