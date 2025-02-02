import BlogPageContent from '@/components/blog/BlogPageContent';
import { blogPosts } from '@/data/blog-posts';

// The main page component is a server component
export default async function BlogPage() {
  return <BlogPageContent posts={blogPosts} />;
} 