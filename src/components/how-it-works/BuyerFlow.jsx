/**
 * BuyerFlow — Step-by-step animated journey for buyers.
 * Mirror structure of TipsterFlow with buyer-specific copy.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints } from '../../theme';
import GlassCard from '../shared/GlassCard';

const Wrapper = styled(motion.div)`
  max-width: 860px;
  margin: 0 auto;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StepRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 44px 1fr;
    gap: 14px;
  }
`;

const NumberCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNum = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${radii.md};
  background: ${({ $highlighted }) => $highlighted ? colors.accent : colors.accentLight};
  color: ${({ $highlighted }) => $highlighted ? '#fff' : colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  flex-shrink: 0;
  border: 2px solid ${({ $highlighted }) => $highlighted ? 'transparent' : colors.accentMid};

  @media (max-width: ${breakpoints.sm}) { width: 44px; height: 44px; font-size: 17px; }
`;

const Connector = styled.div`
  width: 2px;
  height: 24px;
  background: ${colors.accentMid};
  border-radius: 1px;
  margin-top: 4px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${colors.text.secondary};
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  background: ${({ $color }) => $color === 'win' ? colors.winLight : colors.accentLight};
  color: ${({ $color }) => $color === 'win' ? colors.win : colors.accent};
  border-radius: ${radii.pill};
  border: 1px solid ${({ $color }) => $color === 'win' ? 'rgba(46,204,113,0.22)' : colors.accentMid};
  margin-top: 10px;
`;

const steps = [
  {
    n: '01',
    highlighted: false,
    icon: '🔍',
    title: 'Browse verified tipsters',
    desc: 'Filter by win rate, sport, or price. Every tipster\'s history is fully public — win rate, total slips posted, and buyer reviews.',
    tag: null,
  },
  {
    n: '02',
    highlighted: true,
    icon: '💳',
    title: 'Pay ₦1,100 to unlock a slip',
    desc: '₦100 is the platform fee — Slipr\'s only guaranteed revenue. The remaining ₦1,000 goes directly into escrow, not to the tipster.',
    tag: 'Your ₦1,000 is protected by escrow',
  },
  {
    n: '03',
    highlighted: false,
    icon: '🔑',
    title: 'Get the slip code instantly',
    desc: 'The full slip code and reasoning is revealed in your purchase history. Place it on your preferred betting platform before kickoff.',
    tag: null,
  },
  {
    n: '04',
    highlighted: false,
    icon: '🏆',
    title: 'Slip wins — tipster gets paid',
    desc: 'If the slip wins and results are auto-verified via live sports data, escrow is released to the tipster. You walked away with the winnings from your bet.',
    tag: null,
  },
  {
    n: '05',
    highlighted: false,
    icon: '🔄',
    title: 'Slip loses — automatic refund',
    desc: 'If the slip loses, your ₦1,000 is automatically refunded to your Slipr wallet within minutes. No filing, no disputes, no chasing.',
    tag: '₦1,000 refund — automatic',
    tagColor: 'win',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function BuyerFlow() {
  return (
    <Wrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StepList>
        {steps.map((step, i) => (
          <StepRow key={step.n} variants={itemVariants}>
            <NumberCol>
              <StepNum $highlighted={step.highlighted}>{step.n}</StepNum>
              {i < steps.length - 1 && <Connector />}
            </NumberCol>
            <GlassCard padding="22px 24px">
              <CardTitle>{step.icon} {step.title}</CardTitle>
              <CardDesc>{step.desc}</CardDesc>
              {step.tag && <Tag $color={step.tagColor}>{step.tag}</Tag>}
            </GlassCard>
          </StepRow>
        ))}
      </StepList>
    </Wrapper>
  );
}
