import type { BundledLanguage } from 'shiki';

export interface CodeSnippet {
  slug: string;
  title: string;
  description: string;
  date: string | Date;
  author: string;
  tags: string[];
  code: string;
  language: BundledLanguage;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
} 