/**
 * About — /about route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import Story from '../components/about/Story';
import Mission from '../components/about/Mission';
import Team from '../components/about/Team';

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About Slipr"
        title="We built the trust layer <em>sports betting never had.</em>"
        subtitle="Slipr started with a lost ₦5,000 and one question: why can't tipsters be held accountable?"
      />
      <Story />
      <Mission />
      <Team />
    </main>
  );
}
