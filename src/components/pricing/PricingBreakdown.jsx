/**
 * PricingBreakdown — Visual animated split of the ₦1,100 model.
 * Comparison table: Slipr vs WhatsApp vs Telegram.
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

const SplitCard = styled(motion.div)`
  max-width: 640px;
  margin: 56px auto 80px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: 28px;
  padding: 40px;
  box-shadow: ${shadows.md};
`;

const SplitTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
`;

const TotalAmount = styled.span`
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: ${colors.text.primary};
`;

const TotalLabel = styled.span`
  font-size: 15px;
  color: ${colors.text.muted};
`;

const BarTrack = styled.div`
  height: 20px;
  background: ${colors.surface};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  margin-bottom: 20px;
`;

const BarSegment = styled(motion.div)`
  height: 100%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
`;

const SplitRows = styled.div``;

const SplitRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child { border-bottom: none; }
`;

const SplitLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SplitDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const SplitName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text.primary};
`;

const SplitNote = styled.span`
  font-size: 12px;
  color: ${colors.text.muted};
  margin-left: 8px;
`;

const SplitAmount = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color || colors.text.primary};
`;

const ComparisonTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${colors.text.primary};
  margin-bottom: 32px;
`;

const Table = styled(motion.div)`
  max-width: 860px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid ${colors.border};
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  background: ${colors.text.primary};
  padding: 0;

  @media (max-width: ${breakpoints.md}) { display: none; }
`;

const TH = styled.div`
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ $accent }) => $accent ? colors.accent : 'rgba(255,255,255,0.6)'};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  border-bottom: 1px solid ${colors.border};
  background: ${({ $alt }) => $alt ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.85)'};

  &:last-child { border-bottom: none; }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 8px;
  }
`;

const TD = styled.div`
  padding: 16px 20px;
  font-size: 14px;
  color: ${colors.text.secondary};
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.md}) {
    padding: 4px 0;
    &::before { content: attr(data-label); font-weight: 600; color: ${colors.text.primary}; margin-right: 8px; min-width: 120px; font-size: 13px; }
  }
`;

const TDFeature = styled(TD)`
  font-weight: 600;
  color: ${colors.text.primary};
`;

const Check = styled.span`
  color: ${({ $yes }) => $yes ? colors.win : colors.loss};
  font-size: 16px;
  font-weight: 700;
`;

const SliprTD = styled(TD)`
  color: ${colors.text.primary};
  font-weight: 600;
`;

const rows = [
  { feature: 'Refund if slip loses', slipr: true, whatsapp: false, telegram: false },
  { feature: 'Verified tipster profiles', slipr: true, whatsapp: false, telegram: false },
  { feature: 'Transparent win history', slipr: true, whatsapp: false, telegram: false },
  { feature: 'Escrow-protected payment', slipr: true, whatsapp: false, telegram: false },
  { feature: 'Dispute resolution', slipr: true, whatsapp: false, telegram: false },
  { feature: 'Slip screenshot proof', slipr: true, whatsapp: false, telegram: false },
  { feature: 'In-app wallet', slipr: true, whatsapp: false, telegram: false },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

export default function PricingBreakdown() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Pricing Model"
        headline="Simple. Transparent. <em>Fair.</em>"
        subtext="₦1,100 flat per slip. No subscription. No confusing tiers."
      />

      <SplitCard
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <SplitTitle>💳 Every ₦1,100 purchase, explained</SplitTitle>
        <TotalRow>
          <TotalAmount>₦1,100</TotalAmount>
          <TotalLabel>total per slip unlock</TotalLabel>
        </TotalRow>

        <BarTrack>
          <BarSegment
            $bg={colors.accent}
            initial={{ width: 0 }}
            whileInView={{ width: '9.1%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            ₦100
          </BarSegment>
          <BarSegment
            $bg={colors.text.primary}
            initial={{ width: 0 }}
            whileInView={{ width: '90.9%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            ₦1,000 escrow
          </BarSegment>
        </BarTrack>

        <SplitRows>
          <SplitRow>
            <SplitLeft>
              <SplitDot $color={colors.accent} />
              <div>
                <SplitName>Platform fee</SplitName>
                <SplitNote>— goes to Slipr, always, immediately</SplitNote>
              </div>
            </SplitLeft>
            <SplitAmount $color={colors.accent}>₦100</SplitAmount>
          </SplitRow>
          <SplitRow>
            <SplitLeft>
              <SplitDot $color={colors.text.primary} />
              <div>
                <SplitName>Escrow lock</SplitName>
                <SplitNote>— held until result is confirmed</SplitNote>
              </div>
            </SplitLeft>
            <SplitAmount>₦1,000</SplitAmount>
          </SplitRow>
          <SplitRow>
            <SplitLeft>
              <SplitDot $color={colors.win} />
              <div>
                <SplitName>Slip wins → Tipster earns</SplitName>
                <SplitNote>— released from escrow on verified win</SplitNote>
              </div>
            </SplitLeft>
            <SplitAmount $color={colors.win}>₦1,000</SplitAmount>
          </SplitRow>
          <SplitRow>
            <SplitLeft>
              <SplitDot $color={colors.loss} />
              <div>
                <SplitName>Slip loses → Buyer refunded</SplitName>
                <SplitNote>— back to buyer wallet automatically</SplitNote>
              </div>
            </SplitLeft>
            <SplitAmount $color={colors.loss}>₦1,000</SplitAmount>
          </SplitRow>
        </SplitRows>
      </SplitCard>

      <ComparisonTitle>Why Slipr beats free alternatives</ComparisonTitle>
      <Table
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TableHead>
          <TH>Feature</TH>
          <TH $accent>Slipr</TH>
          <TH>WhatsApp Tips</TH>
          <TH>Telegram Groups</TH>
        </TableHead>

        {rows.map((row, i) => (
          <TableRow key={i} $alt={i % 2 === 1} variants={rowVariants}>
            <TDFeature data-label="Feature">{row.feature}</TDFeature>
            <SliprTD data-label="Slipr"><Check $yes={row.slipr}>{row.slipr ? '✓' : '✗'}</Check></SliprTD>
            <TD data-label="WhatsApp"><Check $yes={row.whatsapp}>{row.whatsapp ? '✓' : '✗'}</Check></TD>
            <TD data-label="Telegram"><Check $yes={row.telegram}>{row.telegram ? '✓' : '✗'}</Check></TD>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
}
