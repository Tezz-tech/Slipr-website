/**
 * Contact — /contact route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Got a question?<br /><em>We've got answers.</em>"
        subtitle="We're a small team that takes every message seriously. No automated replies, no weeks of waiting."
      />
      <ContactForm />
    </main>
  );
}
