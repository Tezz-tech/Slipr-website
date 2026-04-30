/**
 * FAQ — /faq route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import FAQAccordion from '../components/faq/FAQAccordion';

export default function FAQ() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Everything you need to know — <em>honestly</em>"
        subtitle="No corporate evasion. If you have a question, we have a real answer."
      />
      <FAQAccordion />
    </main>
  );
}
