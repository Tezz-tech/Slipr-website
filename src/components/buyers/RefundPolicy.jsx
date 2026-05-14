/**
 * RefundPolicy — Clear explanation of when and how buyers get refunded.
 * Timeline visual showing the refund process.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 56px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: ${breakpoints.md}) { grid-template-columns: 1fr; }
`;

const Column = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
  align-items: flex-start;
`;

const TimelineDot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg || colors.accentLight};
  border: 1px solid ${({ $border }) => $border || colors.accentMid};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

const TimelineText = styled.div``;
const TimelineTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 4px;
`;
const TimelineDesc = styled.div`
  font-size: 13px;
  line-height: 1.55;
  color: ${colors.text.secondary};
`;

const PolicyCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: ${radii.xl};
  padding: 24px;
  box-shadow: ${shadows.xs};
`;

const PolicyRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child { border-bottom: none; }
`;

const PolicyIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
`;

const PolicyTextBlock = styled.div``;
const PolicyCondition = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 3px;
`;
const PolicyResult = styled.div`
  font-size: 13px;
  color: ${({ $type }) => $type === 'win' ? colors.win : $type === 'loss' ? colors.loss : colors.text.secondary};
  font-weight: 500;
`;

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export default function RefundPolicy() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Refund Policy"
        headline="When you get it back — and <em>how fast</em>"
        subtext="No fine print. No forms. This is exactly what happens with your money."
      />
      <Inner>
        <Column>
          <ColumnTitle>⏱️ Refund Timeline</ColumnTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '🏁', bg: colors.surface, border: colors.border, title: 'Slip event ends', desc: 'The match, game, or event your slip was based on concludes.' },
              { icon: '📡', bg: colors.accentLight, border: colors.accentMid, title: 'Result verified (0–15 min)', desc: 'Our system cross-checks the result against live sports data automatically.' },
              { icon: '❌', bg: colors.lossLight, border: 'rgba(231,76,60,0.22)', title: 'Loss confirmed', desc: 'System detects the slip lost based on verified result data.' },
              { icon: '💳', bg: colors.winLight, border: 'rgba(46,204,113,0.22)', title: 'Refund hits your wallet', desc: '₦1,000 appears in your Slipr wallet automatically — no action required.' },
              { icon: '🏦', bg: colors.accentLight, border: colors.accentMid, title: 'Withdraw anytime', desc: 'Transfer to your bank instantly or use the balance for another slip.' },
            ].map((item, i) => (
              <TimelineItem key={i} variants={itemVariants}>
                <TimelineDot $bg={item.bg} $border={item.border}>{item.icon}</TimelineDot>
                <TimelineText>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDesc>{item.desc}</TimelineDesc>
                </TimelineText>
              </TimelineItem>
            ))}
          </motion.div>
        </Column>

        <Column>
          <ColumnTitle>📋 Refund Conditions</ColumnTitle>
          <PolicyCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {[
              { icon: '✅', condition: 'Slip loses', result: 'Full ₦1,000 refund to wallet', type: 'win' },
              { icon: '⏰', condition: 'Match postponed or cancelled', result: 'Full ₦1,000 refund within 48 hours', type: 'win' },
              { icon: '🏆', condition: 'Slip wins', result: 'No refund — ₦1,000 released to tipster', type: 'neutral' },
              { icon: '💡', condition: 'Buyer changes mind after purchase', result: 'No refund — code already revealed', type: 'loss' },
              { icon: '⚠️', condition: 'Disputed result under review', result: 'Escrow held until resolution (≤24h)', type: 'neutral' },
            ].map((row, i) => (
              <PolicyRow key={i}>
                <PolicyIcon>{row.icon}</PolicyIcon>
                <PolicyTextBlock>
                  <PolicyCondition>{row.condition}</PolicyCondition>
                  <PolicyResult $type={row.type}>{row.result}</PolicyResult>
                </PolicyTextBlock>
              </PolicyRow>
            ))}
          </PolicyCard>
        </Column>
      </Inner>
    </Section>
  );
}
