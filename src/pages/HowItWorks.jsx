/**
 * HowItWorks — /how-it-works route
 * Toggle between Tipster and Buyer journeys. AnimatePresence between flows.
 * Full escrow diagram. CTAs to Tipsters and Buyers pages.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionBridge from '../components/shared/SectionBridge';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { colors as themeColors, spacing as themeSpacing, breakpoints as bp } from '../theme';
import PageHero from '../components/shared/PageHero';
import FlowToggle from '../components/how-it-works/FlowToggle';
import TipsterFlow from '../components/how-it-works/TipsterFlow';
import BuyerFlow from '../components/how-it-works/BuyerFlow';
import EscrowDiagram from '../components/how-it-works/EscrowDiagram';
import Button from '../components/shared/Button';

const ToggleSection = styled.section`
  padding: 0 80px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${bp.lg}) { padding: 0 40px 64px; }
  @media (max-width: ${bp.md}) { padding: 0 20px 56px; }
`;

const FlowPane = styled(motion.div)`
  width: 100%;
`;

const DiagramSection = styled.section`
  padding: ${themeSpacing.section} 80px;
  background: ${themeColors.surface};

  @media (max-width: ${bp.lg}) { padding: ${themeSpacing.section} 40px; }
  @media (max-width: ${bp.md}) { padding: 72px 20px; }
`;

const CTASection = styled.section`
  padding: ${themeSpacing.section} 80px;
  text-align: center;

  @media (max-width: ${bp.lg}) { padding: ${themeSpacing.section} 40px; }
  @media (max-width: ${bp.md}) { padding: 72px 20px; }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 640px;
  margin: 32px auto 0;

  @media (max-width: ${bp.sm}) { grid-template-columns: 1fr; }
`;

const CTACard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 28px;
  text-align: center;
`;

const CTACardIcon = styled.div`
  font-size: 36px;
  margin-bottom: 14px;
`;

const CTACardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${themeColors.text.primary};
  margin-bottom: 8px;
`;

const CTACardDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${themeColors.text.secondary};
  margin-bottom: 18px;
`;

export default function HowItWorks() {
  const [activeFlow, setActiveFlow] = useState('tipster');

  return (
    <main>
      <PageHero
        eyebrow="The full breakdown"
        title="Transparent by design,<br /><em>not by accident</em>"
        subtitle="Understand exactly how every naira moves from buyer to tipster — and who holds it in between."
      />

      <ToggleSection>
        <FlowToggle active={activeFlow} onChange={setActiveFlow} />

        <AnimatePresence mode="wait">
          {activeFlow === 'tipster' ? (
            <FlowPane
              key="tipster"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <TipsterFlow />
            </FlowPane>
          ) : (
            <FlowPane
              key="buyer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <BuyerFlow />
            </FlowPane>
          )}
        </AnimatePresence>
      </ToggleSection>

      <DiagramSection>
        <EscrowDiagram />
      </DiagramSection>

      <CTASection>
        <motion.h2
          style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '10px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Which side are you on?
        </motion.h2>
        <motion.p
          style={{ color: themeColors.text.secondary, fontSize: '16px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Deep-dive into the experience built for you.
        </motion.p>

        <CTAGrid>
          <CTACard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <CTACardIcon>💡</CTACardIcon>
            <CTACardTitle>I'm a Tipster</CTACardTitle>
            <CTACardDesc>Learn how to post slips, build your reputation, and turn a winning streak into real income.</CTACardDesc>
            <Button as={Link} to="/tipsters" fullWidth>Tipster Guide →</Button>
          </CTACard>

          <CTACard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <CTACardIcon>🎯</CTACardIcon>
            <CTACardTitle>I'm a Buyer</CTACardTitle>
            <CTACardDesc>Discover how escrow keeps your money safe and how to pick the right tipster every time.</CTACardDesc>
            <Button as={Link} to="/buyers" variant="secondary" fullWidth>Buyer Guide →</Button>
          </CTACard>
        </CTAGrid>
      </CTASection>

      <SectionBridge
        variant="network"
        label="BECOME A TIPSTER"
        title="Your wins are worth <em>real money</em>"
        subtitle="Join thousands of Nigerian tipsters already turning verified picks into consistent income."
        cta="Start earning"
        to="/tipsters"
        achievement={{ icon: '🎯', text: 'Tipster Path Unlocked' }}
        xp={150}
      />
    </main>
  );
}
