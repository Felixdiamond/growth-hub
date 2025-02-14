import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Projects from '@/components/Projects';
import { Newsletter } from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-dark-900 min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <Projects />
      <Newsletter />
      <Footer />
    </main>
  );
}
