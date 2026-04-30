/**
 * EscrowExplainer — How escrow protects the buyer's ₦1,000.
 * Visual animated breakdown of the split.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const VisualWrapper = styled.div`
  max-width: 700px;
  margin: 56px auto 0;
`;

const PaymentBar = styled(motion.div)`
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: ${radii.xl};
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: ${shadows.sm};
`;

const BarLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.text.muted};
  margin-bottom: 12px;
`;

const BarTrack = styled.div`
  height: 14px;
  background: ${colors.surface};
  border-radius: 7px;
  overflow: hidden;
  display: flex;
`;

const BarFill = styled(motion.div)`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: 7px;
`;

const BarLegend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: ${colors.text.secondary};
`;

const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const ProtectionCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const ProtCard = styled(motion.div)`
  border-radius: ${radii.lg};
  padding: 22px;
  background: rgba(255,255,255,0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  box-shadow: ${shadows.xs};
`;

const ProtIcon = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
`;

const ProtTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 7px;
`;

const ProtDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.text.secondary};
`;

const protections = [
  { icon: '🔒', title: 'Escrow holds your ₦1,000', desc: 'From the moment you pay, your ₦1,000 is locked in Slipr\'s escrow — not in the tipster\'s hands.' },
  { icon: '⚡', title: 'Automatic settlement', desc: 'No need to raise a claim. The system checks results and moves money without you lifting a finger.' },
  { icon: '🔍', title: 'Screenshot verification', desc: 'Tipsters must upload official betting platform screenshots. We verify before releasing escrow.' },
  { icon: '🛡️', title: 'Dispute protection', desc: 'If a result is unclear or contested, our review team steps in and resolves it fairly within 24 hours.' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export default function EscrowExplainer() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Escrow Protection"
        headline="Your ₦1,000 never touches <em>the tipster's wallet</em>"
        subtext="Until the result is confirmed, your money stays exactly where it should — in escrow."
      />
      <VisualWrapper>
        <PaymentBar
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BarLabel>Where your ₦1,100 goes</BarLabel>
          <BarTrack>
            <BarFill
              $color={colors.accent}
              initial={{ width: 0 }}
              whileInView={{ width: '9.1%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
            <BarFill
              $color={colors.text.primary}
              initial={{ width: 0 }}
              whileInView={{ width: '90.9%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </BarTrack>
          <BarLegend>
            <LegendItem>
              <LegendDot $color={colors.accent} />
              ₦100 — Platform fee (non-refundable)
            </LegendItem>
            <LegendItem>
              <LegendDot $color={colors.text.primary} />
              ₦1,000 — Escrow (refundable)
            </LegendItem>
          </BarLegend>
        </PaymentBar>

        <ProtectionCards
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {protections.map((p, i) => (
            <ProtCard key={i} variants={cardVariants}>
              <ProtIcon>{p.icon}</ProtIcon>
              <ProtTitle>{p.title}</ProtTitle>
              <ProtDesc>{p.desc}</ProtDesc>
            </ProtCard>
          ))}
        </ProtectionCards>
      </VisualWrapper>
    </Section>
  );
}
