import { notFound } from 'next/navigation';
import { codeSnippets } from '@/data/code-snippets';
import ClientCodePage from './client';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const snippet = codeSnippets.find(s => s.slug === params.slug);

  if (!snippet) {
    return {
      title: 'Not Found',
      description: 'The requested code snippet could not be found.',
    };
  }

  return {
    title: `${snippet.title} - Growth Hub Code`,
    description: snippet.description,
  };
}

export default async function CodeSnippetPage({
  params,
}: {
  params: { slug: string };
}) {
  const snippet = codeSnippets.find(s => s.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return <ClientCodePage snippet={snippet} />;
} 