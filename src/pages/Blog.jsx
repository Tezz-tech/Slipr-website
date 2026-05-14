/**
 * Blog — /blog route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import BlogGrid from '../components/blog/BlogGrid';
import SectionBridge from '../components/shared/SectionBridge';

export default function Blog() {
  return (
    <main>
      <PageHero
        eyebrow="Slipr Blog"
        title="Insight for <em>tipsters and buyers</em>"
        subtitle="Strategy guides, platform updates, and honest commentary on Nigeria's betting tip market."
      />
      <BlogGrid />

      <SectionBridge
        variant="ripple"
        label="SHARE YOUR EDGE"
        title="Turn insight into <em>income</em>"
        subtitle="The tipsters with the best records started exactly where you are. Your streak is your product."
        cta="Become a tipster"
        to="/tipsters"
        achievement={{ icon: '✍️', text: 'Creator Mode' }}
        xp={100}
      />
    </main>
  );
}
