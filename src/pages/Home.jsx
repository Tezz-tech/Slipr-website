/**
 * Home — / route
 * Assembles all homepage sections in order.
 */
import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorksPreview from '../components/home/HowItWorksPreview';
import FeaturesGrid from '../components/home/FeaturesGrid';
import SocialProof from '../components/home/SocialProof';
import HomeCTA from '../components/home/HomeCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorksPreview />
      <FeaturesGrid />
      <SocialProof />
      <HomeCTA />
    </main>
  );
}
