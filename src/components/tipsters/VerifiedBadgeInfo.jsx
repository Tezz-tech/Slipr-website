/**
 * VerifiedBadgeInfo — Explains the gold Verified badge: what it is, how to earn it, what it unlocks.
 * Split layout with badge visual on left, criteria list on right.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 56px auto 0;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 40px;
  align-items: start;

  @media (max-width: ${breakpoints.md}) { grid-template-columns: 1fr; }
`;

const BadgeVisual = styled(motion.div)`
  background: ${colors.text.primary};
  border-radius: ${radii.xl};
  padding: 48px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
`;

const BigBadgeIcon = styled.div`
  font-size: 72px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

const BadgeName = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #F5A623;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
`;

const BadgeSubtext = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const UnlocksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 28px;
  position: relative;
  z-index: 1;
`;

const UnlockItem = styled.div`
  background: rgba(245,166,35,0.10);
  border: 1px solid rgba(245,166,35,0.20);
  border-radius: ${radii.md};
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #F5A623;
  text-align: center;
`;

const CriteriaPanel = styled.div``;

const CriteriaTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};
  margin-bottom: 20px;
`;

const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CriteriaItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  background: rgba(255,255,255,0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: ${radii.lg};
  box-shadow: ${shadows.xs};
`;

const CriteriaCheck = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ $met }) => $met ? colors.winLight : colors.accentLight};
  border: 1px solid ${({ $met }) => $met ? 'rgba(46,204,113,0.22)' : colors.accentMid};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
`;

const CriteriaText = styled.div``;
const CriteriaLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 3px;
`;
const CriteriaDesc = styled.div`
  font-size: 13px;
  color: ${colors.text.secondary};
  line-height: 1.5;
`;

const criteria = [
  { met: true, icon: '📊', label: 'Minimum 50 slips posted', desc: 'Your track record needs a real sample size before we can vouch for you.' },
  { met: true, icon: '✅', label: 'Win rate above 60%', desc: 'Consistent performance over at least 50 slips. Not one lucky streak.' },
  { met: false, icon: '📸', label: 'Screenshot verification enabled', desc: 'You must enable screenshot proof for your slips. No proof, no verification.' },
  { met: false, icon: '⭐', label: 'Average review rating 4.2+', desc: 'Buyers who bought your slips have rated you fairly and highly.' },
  { met: false, icon: '🔒', label: 'No open disputes in 90 days', desc: 'Clean record — no unresolved disputes or complaints from buyers.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export default function VerifiedBadgeInfo() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Verified Badge"
        headline="Earn the gold badge. <em>Earn more.</em>"
        subtext="Verified tipsters get premium placement, buyer trust, and higher unlock rates. Here's exactly how to get there."
      />
      <Inner>
        <BadgeVisual
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <BigBadgeIcon>⭐</BigBadgeIcon>
          <BadgeName>Verified Tipster</BadgeName>
          <BadgeSubtext>Platform-certified performance.<br />Buyers see this badge first.</BadgeSubtext>
          <UnlocksGrid>
            <UnlockItem>Top search rank</UnlockItem>
            <UnlockItem>Gold profile badge</UnlockItem>
            <UnlockItem>Higher buyer trust</UnlockItem>
            <UnlockItem>Featured placement</UnlockItem>
          </UnlocksGrid>
        </BadgeVisual>

        <CriteriaPanel>
          <CriteriaTitle>What it takes to get Verified</CriteriaTitle>
          <CriteriaList
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {criteria.map((c, i) => (
              <CriteriaItem key={i} variants={itemVariants}>
                <CriteriaCheck $met={c.met}>{c.icon}</CriteriaCheck>
                <CriteriaText>
                  <CriteriaLabel>{c.label}</CriteriaLabel>
                  <CriteriaDesc>{c.desc}</CriteriaDesc>
                </CriteriaText>
              </CriteriaItem>
            ))}
          </CriteriaList>
        </CriteriaPanel>
      </Inner>
    </Section>
  );
}
