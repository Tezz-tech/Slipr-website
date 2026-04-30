/**
 * Blog — /blog route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import BlogGrid from '../components/blog/BlogGrid';

export default function Blog() {
  return (
    <main>
      <PageHero
        eyebrow="Slipr Blog"
        title="Insight for <em>tipsters and buyers</em>"
        subtitle="Strategy guides, platform updates, and honest commentary on Nigeria's betting tip market."
      />
      <BlogGrid />
    </main>
  );
}
