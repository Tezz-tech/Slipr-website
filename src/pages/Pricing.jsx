/**
 * Pricing — /pricing route
 */
import React from 'react';
import PageHero from '../components/shared/PageHero';
import PricingBreakdown from '../components/pricing/PricingBreakdown';
import PricingFAQ from '../components/pricing/PricingFAQ';

export default function Pricing() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Simple. Transparent.<br /><em>Fair.</em>"
        subtitle="One price. One model. You always know exactly where every naira goes before you tap pay."
      />
      <PricingBreakdown />
      <PricingFAQ />
    </main>
  );
}
