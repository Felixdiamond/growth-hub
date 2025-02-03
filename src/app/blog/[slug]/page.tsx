import { Metadata } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';

function getBlogSlugs() {
  const postsDirectory = join(process.cwd(), 'src/content/blog');
  return readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const { default: Content } = await import(`../../../content/blog/${params.slug}.mdx`);
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
  params: { slug: string } 
}): Promise<Metadata> {
  return {
    title: `Blog Post: ${params.slug}`,
    description: `Details about blog post ${params.slug}`
  };
}

export const dynamicParams = false;