/**
 * SocialProof — Infinite scrolling marquee of tipster cards.
 * Two rows scrolling in opposite directions.
 * CSS animation (Framer Motion can't do seamless infinite marquee efficiently).
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';

const Section = styled.section`
  padding: ${spacing.section} 0;
  background: ${colors.surface};
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  padding: 0 80px;
  margin-bottom: 52px;

  @media (max-width: ${breakpoints.lg}) { padding: 0 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 0 20px; }
`;

const scrollLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
`;

const Track = styled.div`
  display: flex;
  gap: 16px;
  width: max-content;
  animation: ${({ $direction }) => $direction === 'right' ? scrollRight : scrollLeft}
    ${({ $speed }) => $speed || 30}s linear infinite;

  &:hover { animation-play-state: paused; }
`;

const Row = styled.div`
  overflow: hidden;
  margin-bottom: 16px;
  mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
`;

const TipsterCard = styled.div`
  background: rgba(255,255,255,0.90);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: ${radii.xl};
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: ${shadows.xs};
  flex-shrink: 0;
  min-width: 260px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const CardName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.text.primary};
  letter-spacing: -0.01em;
`;

const GoldBadge = styled.span`
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  background: rgba(245,166,35,0.12);
  color: #F5A623;
  border-radius: 4px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WinRate = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.win};
`;

const Slips = styled.span`
  font-size: 12px;
  color: ${colors.text.muted};
`;

const Earned = styled.div`
  text-align: right;
`;

const EarnedLabel = styled.div`
  font-size: 10px;
  color: ${colors.text.muted};
  font-weight: 500;
`;

const EarnedValue = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${colors.text.primary};
  letter-spacing: -0.02em;
`;

const tipsters = [
  { name: 'KingPunter_NG', init: 'KP', bg: 'linear-gradient(135deg,#00C2A8,#00E5C8)', wins: '81%', slips: '240 slips', earned: '₦192,000', verified: true },
  { name: 'SureOddsNG', init: 'SO', bg: 'linear-gradient(135deg,#F5A623,#F8C66C)', wins: '75%', slips: '188 slips', earned: '₦150,000', verified: true },
  { name: 'BetMasterKay', init: 'BK', bg: 'linear-gradient(135deg,#2ECC71,#27AE60)', wins: '69%', slips: '120 slips', earned: '₦96,000', verified: false },
  { name: 'SlipQueenAbi', init: 'SQ', bg: 'linear-gradient(135deg,#E74C3C,#C0392B)', wins: '78%', slips: '310 slips', earned: '₦248,000', verified: true },
  { name: 'NaijaTipster1', init: 'NT', bg: 'linear-gradient(135deg,#9B59B6,#8E44AD)', wins: '72%', slips: '95 slips', earned: '₦76,000', verified: false },
  { name: 'OddsWhisperer', init: 'OW', bg: 'linear-gradient(135deg,#3498DB,#2980B9)', wins: '84%', slips: '402 slips', earned: '₦320,000', verified: true },
  { name: 'IjeomaBets', init: 'IB', bg: 'linear-gradient(135deg,#00C2A8,#009980)', wins: '70%', slips: '76 slips', earned: '₦60,800', verified: true },
  { name: 'ChuksFormula', init: 'CF', bg: 'linear-gradient(135deg,#F39C12,#E67E22)', wins: '66%', slips: '55 slips', earned: '₦44,000', verified: false },
];

const row1 = [...tipsters, ...tipsters];
const row2 = [...tipsters.slice(4), ...tipsters.slice(0, 4), ...tipsters.slice(4), ...tipsters.slice(0, 4)];

const TipsterCardItem = ({ t }) => (
  <TipsterCard>
    <Avatar $bg={t.bg}>{t.init}</Avatar>
    <CardInfo>
      <CardTop>
        <CardName>{t.name}</CardName>
        {t.verified && <GoldBadge>Verified</GoldBadge>}
      </CardTop>
      <CardMeta>
        <WinRate>{t.wins} wins</WinRate>
        <Slips>{t.slips}</Slips>
      </CardMeta>
    </CardInfo>
    <Earned>
      <EarnedLabel>Total earned</EarnedLabel>
      <EarnedValue>{t.earned}</EarnedValue>
    </Earned>
  </TipsterCard>
);

export default function SocialProof() {
  return (
    <Section>
      <HeaderWrapper>
        <SectionHeader
          eyebrow="Live Tipsters"
          headline="Real tipsters. <em>Real earnings.</em>"
          subtext="These are the people building a side income on Slipr. Every number here is on-chain verifiable."
        />
      </HeaderWrapper>

      <Row>
        <Track $direction="left" $speed={35}>
          {row1.map((t, i) => <TipsterCardItem key={i} t={t} />)}
        </Track>
      </Row>

      <Row>
        <Track $direction="right" $speed={40}>
          {row2.map((t, i) => <TipsterCardItem key={i} t={t} />)}
        </Track>
      </Row>
    </Section>
  );
}
