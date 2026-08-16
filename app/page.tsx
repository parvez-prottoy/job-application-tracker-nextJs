import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
    </>
  );
}
