import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import CustomScrollbar from "@/components/CustomScrollbar";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Growth Hub - Premium Electronics & Arduino Tutorials",
  description: "Join The Growth Hub for premium Arduino tutorials, electronics projects, and expert guidance. Learn, create, and grow with our comprehensive resources.",
  keywords: "Arduino tutorials, electronics projects, RGB LEDs, maker community, electronics education",
  authors: [{ name: "Shaun Sosi" }],
  openGraph: {
    title: "The Growth Hub - Premium Electronics & Arduino Tutorials",
    description: "Join The Growth Hub for premium Arduino tutorials, electronics projects, and expert guidance.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <CustomCursor />
          <CustomScrollbar />
          <SmoothScroll>
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
