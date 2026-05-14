/**
 * FAQ — /faq route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import FAQAccordion from '../components/faq/FAQAccordion';
import SectionBridge from '../components/shared/SectionBridge';

export default function FAQ() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Everything you need to know — <em>honestly</em>"
        subtitle="No corporate evasion. If you have a question, we have a real answer."
      />
      <FAQAccordion />

      <SectionBridge
        variant="wave"
        label="STILL UNSURE?"
        title="Our team has <em>the real answers</em>"
        subtitle="Can't find what you're looking for? Drop us a message and we'll get back to you same day."
        cta="Talk to us"
        to="/contact"
        achievement={{ icon: '💬', text: 'Support Channel Open' }}
        xp={75}
      />
    </main>
  );
}
