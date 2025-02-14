'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CustomCursor from "@/components/CustomCursor";
import CustomScrollbar from "@/components/CustomScrollbar";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Handle hash navigation
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <ThemeProvider>
      <CustomCursor />
      <CustomScrollbar />
      <SmoothScroll>
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </SmoothScroll>
    </ThemeProvider>
  );
} 