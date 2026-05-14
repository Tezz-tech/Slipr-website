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
import SectionBridge from '../components/shared/SectionBridge';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorksPreview />
      <FeaturesGrid />
      <SectionBridge
        variant="vortex"
        label="NEXT STEP"
        title="See the full flow — <em>step by step</em>"
        subtitle="Every naira tracked, every outcome verified. Understand exactly how Slipr works before you commit."
        cta="Explore how it works"
        to="/how-it-works"
        achievement={{ icon: '⚡', text: 'Flow Unlocked' }}
        xp={100}
      />
      <SocialProof />
      <HomeCTA />
    </main>
  );
}
