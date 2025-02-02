import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import client components
const BlogArticle = dynamic(() => import('@/components/blog/BlogArticle'), { ssr: true })
const BlogHeading = dynamic(() => import('@/components/blog/BlogHeading'), { ssr: true })
const BlogParagraph = dynamic(() => import('@/components/blog/BlogParagraph'), { ssr: true })
const BlogCode = dynamic(() => import('@/components/blog/BlogCode'), { ssr: true })
const BlogList = dynamic(() => import('@/components/blog/BlogList'), { ssr: true })
const BlogListItem = dynamic(() => import('@/components/blog/BlogListItem'), { ssr: true })
const BlogLink = dynamic(() => import('@/components/blog/BlogLink'), { ssr: true })
const BlogMedia = dynamic(() => import('@/components/blog/BlogMedia'), { ssr: true })

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1
    }
  }
};
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Layout wrapper
    article: ({ children }) => (
      <BlogArticle>{children}</BlogArticle>
    ),
    // Headings
    h1: ({ children }) => (
      <BlogHeading as="h1" size="1">{children}</BlogHeading>
    ),
    h2: ({ children }) => (
      <BlogHeading as="h2" size="2">{children}</BlogHeading>
    ),
    h3: ({ children }) => (
      <BlogHeading as="h3" size="3">{children}</BlogHeading>
    ),
    // Text elements
    p: ({ children }) => (
      <BlogParagraph>{children}</BlogParagraph>
    ),
    // Code blocks
    pre: ({ children }) => (
      <BlogCode variant="block">{children}</BlogCode>
    ),
    code: ({ children }) => (
      <BlogCode variant="inline">{children}</BlogCode>
    ),
    // Lists
    ul: ({ children }) => (
      <BlogList>{children}</BlogList>
    ),
    li: ({ children }) => (
      <BlogListItem>{children}</BlogListItem>
    ),
    // Links
    a: ({ children, ...props }) => (
      <BlogLink {...props}>{children}</BlogLink>
    ),
    // Images
    img: ({ src, alt }) => (
      <BlogMedia src={src} alt={alt} />
    ),
    ...components,
  }
}