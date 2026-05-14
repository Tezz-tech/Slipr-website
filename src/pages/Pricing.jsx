/**
 * Pricing — /pricing route
 */
import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import PageHero from '../components/shared/PageHero';
import PricingBreakdown from '../components/pricing/PricingBreakdown';
import PricingFAQ from '../components/pricing/PricingFAQ';
import SectionBridge from '../components/shared/SectionBridge';

const OddsParticlesScene = lazy(() => import('../components/three/OddsParticlesScene'));

const OrbitalSection = styled.section`
  position: relative;
  height: 500px;
  background: ${colors.bgAlt};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrbitalLabel = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  pointer-events: none;
  h3 {
    font-size: clamp(24px, 3vw, 40px);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${colors.text.primary};
    margin-bottom: 8px;
    em { color: ${colors.accent}; font-style: normal; }
  }
  p { font-size: 15px; color: ${colors.text.secondary}; }
`;

export default function Pricing() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Simple. Transparent.<br /><em>Fair.</em>"
        subtitle="One price. One model. You always know exactly where every naira goes before you tap pay."
      />
      <OrbitalSection>
        <Suspense fallback={null}>
          <OddsParticlesScene />
        </Suspense>
        <OrbitalLabel>
          <h3>One price.<br /><em>Zero surprises.</em></h3>
          <p>Every naira tracked. Every transaction protected.</p>
        </OrbitalLabel>
      </OrbitalSection>
      <PricingBreakdown />
      <PricingFAQ />

      <SectionBridge
        variant="burst"
        label="READY TO EARN"
        title="Join the <em>winning side</em>"
        subtitle="Your first slip could go out today. Setup takes under two minutes — zero upfront cost."
        cta="Become a tipster"
        to="/tipsters"
        achievement={{ icon: '🚀', text: 'Launch Ready' }}
        xp={250}
      />
    </main>
  );
}
