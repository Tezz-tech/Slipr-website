/**
 * FeaturesGrid — 6 glassmorphism feature cards in a 3x2 grid.
 * Stagger animation on scroll. Each card has an icon, title, and description.
 * Hover: y:-6, teal shadow bloom.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const Section = styled.section`
  padding: ${spacing.section} 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: ${spacing.section} 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 64px auto 0;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled(GlassCard)`
  /* Additional override for denser look */
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${({ $bg }) => $bg || colors.accentLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 18px;
  border: 1px solid ${({ $border }) => $border || colors.accentMid};
`;

const FeatureTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};
  margin-bottom: 9px;
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${colors.text.secondary};
`;

const features = [
  {
    icon: '🛡️',
    bg: colors.accentLight,
    border: colors.accentMid,
    title: 'Escrow Protection',
    desc: 'Every purchase goes into escrow. Your ₦1,000 only moves when the result is confirmed — to the tipster if win, to your wallet if loss.',
  },
  {
    icon: '⭐',
    bg: 'rgba(245,166,35,0.10)',
    border: 'rgba(245,166,35,0.22)',
    title: 'Verified Tipsters',
    desc: 'Only tipsters with proven track records and screenshot verification earn the gold Verified badge. Filter by it to find the best.',
  },
  {
    icon: '📊',
    bg: 'rgba(46,204,113,0.10)',
    border: 'rgba(46,204,113,0.22)',
    title: 'Transparent Stats',
    desc: 'Every tipster\'s win rate, slip count, and earnings history is public. No hiding behind hype — the numbers speak.',
  },
  {
    icon: '⚡',
    bg: 'rgba(231,76,60,0.08)',
    border: 'rgba(231,76,60,0.18)',
    title: 'Instant Settlements',
    desc: 'Escrow releases automatically within minutes of a result being confirmed. No waiting, no chasing, no disputes needed.',
  },
  {
    icon: '💳',
    bg: colors.accentLight,
    border: colors.accentMid,
    title: 'In-App Wallet',
    desc: 'Refunds and earnings go straight to your Slipr wallet. Withdraw to any Nigerian bank account or use it to buy more slips.',
  },
  {
    icon: '🔍',
    bg: 'rgba(245,166,35,0.10)',
    border: 'rgba(245,166,35,0.22)',
    title: 'Dispute System',
    desc: 'If a result is contested, our verification team reviews screenshot proof and settles it fairly. Tipsters can\'t game the system.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function FeaturesGrid() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Why Slipr"
        headline="The infrastructure that makes <em>tips trustworthy</em>"
        subtext="We built the layer that WhatsApp and Telegram never could. Every feature exists to protect you."
      />
      <Grid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={cardVariants}>
            <GlassCard animate>
              <IconBox $bg={f.bg} $border={f.border}>{f.icon}</IconBox>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureDesc>{f.desc}</FeatureDesc>
            </GlassCard>
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
}
