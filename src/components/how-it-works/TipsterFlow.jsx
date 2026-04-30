/**
 * TipsterFlow — Step-by-step animated journey for tipsters.
 * Numbered cards with icons, stagger animation, connecting line.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
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
  gap: 0;
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

const CardContent = styled.div`
  padding-bottom: 4px;
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
  background: ${colors.accentLight};
  color: ${colors.accent};
  border-radius: ${radii.pill};
  border: 1px solid ${colors.accentMid};
  margin-top: 10px;
`;

const steps = [
  {
    n: '01',
    highlighted: false,
    icon: '📱',
    title: 'Create your free account',
    desc: 'Sign up in under 60 seconds. Verify your phone number. No subscription fee, no upfront cost — you only pay when you post a slip.',
    tag: null,
  },
  {
    n: '02',
    highlighted: true,
    icon: '📝',
    title: 'Post a betting slip',
    desc: 'Submit your slip code, the sport, the odds, and a short reasoning. Buyers can see your win rate before they decide to unlock.',
    tag: 'Your code is hidden until purchase',
  },
  {
    n: '03',
    highlighted: false,
    icon: '🔒',
    title: 'Buyer pays — escrow holds ₦1,000',
    desc: '₦100 platform fee is settled immediately. The ₦1,000 sits in escrow under Slipr\'s control — not yours, not the buyer\'s — until results.',
    tag: null,
  },
  {
    n: '04',
    highlighted: false,
    icon: '✅',
    title: 'Slip wins — escrow releases to you',
    desc: 'When your slip wins and screenshots are verified, ₦1,000 is released directly to your Slipr wallet. No delays, no admin approval needed.',
    tag: 'Average payout within 15 minutes',
  },
  {
    n: '05',
    highlighted: false,
    icon: '💸',
    title: 'Withdraw to your bank',
    desc: 'Transfer your wallet balance to any Nigerian bank account instantly. No minimum withdrawal. Small flat fee covers transfer costs.',
    tag: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function TipsterFlow() {
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
              <CardContent>
                <CardTitle>{step.icon} {step.title}</CardTitle>
                <CardDesc>{step.desc}</CardDesc>
                {step.tag && <Tag>{step.tag}</Tag>}
              </CardContent>
            </GlassCard>
          </StepRow>
        ))}
      </StepList>
    </Wrapper>
  );
}
