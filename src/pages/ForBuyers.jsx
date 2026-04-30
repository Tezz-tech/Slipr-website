/**
 * ForBuyers — /buyers route
 * Hero + Escrow Explainer + Refund Policy + Trust & Safety + CTA
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, breakpoints } from '../theme';
import PageHero from '../components/shared/PageHero';
import EscrowExplainer from '../components/buyers/EscrowExplainer';
import RefundPolicy from '../components/buyers/RefundPolicy';
import TrustSafety from '../components/buyers/TrustSafety';
import Button from '../components/shared/Button';

const CTASection = styled.section`
  padding: ${spacing.section} 80px;
  background: ${colors.surface};
  text-align: center;

  @media (max-width: ${breakpoints.lg}) { padding: ${spacing.section} 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

export default function ForBuyers() {
  return (
    <main>
      <PageHero
        eyebrow="For Buyers"
        title="Buy smart.<br /><em>Get back if it misses.</em>"
        subtitle="Every tip you buy is backed by escrow. If the slip loses, ₦1,000 comes back to your wallet. Automatically. No questions."
      />

      <EscrowExplainer />
      <RefundPolicy />
      <TrustSafety />

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: colors.accent, marginBottom: '16px' }}>
            Ready to buy your first slip?
          </p>
          <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '14px', color: colors.text.primary }}>
            Smart money follows verified tipsters.
          </h2>
          <p style={{ fontSize: '17px', color: colors.text.secondary, marginBottom: '32px', maxWidth: '440px', margin: '0 auto 32px' }}>
            Download the app and browse real tipsters with verified win rates before you spend a single naira.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="xl">Download for iOS</Button>
            <Button variant="secondary" size="xl">Download for Android</Button>
          </div>
        </motion.div>
      </CTASection>
    </main>
  );
}
