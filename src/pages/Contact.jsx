/**
 * Contact — /contact route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import ContactForm from '../components/contact/ContactForm';
import SectionBridge from '../components/shared/SectionBridge';

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Got a question?<br /><em>We've got answers.</em>"
        subtitle="We're a small team that takes every message seriously. No automated replies, no weeks of waiting."
      />
      <ContactForm />

      <SectionBridge
        variant="pulse"
        label="EXPLORE SLIPR"
        title="Start your <em>journey today</em>"
        subtitle="Whether you're hunting picks or selling them — your first move on Slipr starts here."
        cta="Go to homepage"
        to="/"
        achievement={{ icon: '🏠', text: 'Home Base' }}
        xp={50}
      />
    </main>
  );
}
