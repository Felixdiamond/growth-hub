export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string | Date;
  image: string;
  author: string;
  tags: string[];
  excerpt?: string;
  episode?: number;
} 