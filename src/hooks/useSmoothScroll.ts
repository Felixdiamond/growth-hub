import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useSmoothScroll() {
  const router = useRouter();

  const scrollToSection = useCallback((sectionId: string) => {
    // If we're already on the page with the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // If we're on a different page, navigate to home and then scroll
    router.push(`/#${sectionId}`);
  }, [router]);

  return { scrollToSection };
} 