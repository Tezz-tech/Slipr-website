/**
 * HowItWorksPreview — 3-step teaser of the platform flow.
 * Scroll-triggered stagger animation on numbered glass cards.
 * Connecting line between steps.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';

const Section = styled.section`
  padding: ${spacing.section} 80px;
  background: ${colors.surface};
  position: relative;

  @media (max-width: ${breakpoints.lg}) { padding: ${spacing.section} 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const StepsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 64px auto 48px;
  position: relative;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
`;

/* Connecting line between cards — desktop only */
const ConnectorLine = styled.div`
  position: absolute;
  top: 56px;
  left: calc(33.33% - 12px);
  right: calc(33.33% - 12px);
  height: 2px;
  background: linear-gradient(90deg, ${colors.accentMid}, ${colors.accent}, ${colors.accentMid});
  border-radius: 1px;
  z-index: 0;

  @media (max-width: ${breakpoints.md}) { display: none; }
`;

const StepCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: ${radii.xl};
  padding: 32px 28px;
  position: relative;
  z-index: 1;
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.25s, transform 0.25s;

  &:hover {
    box-shadow: ${shadows.cardHover};
    transform: translateY(-4px);
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${({ $active }) => $active ? colors.accent : colors.accentLight};
  color: ${({ $active }) => $active ? '#fff' : colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
  border: 2px solid ${({ $active }) => $active ? 'transparent' : colors.accentMid};
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};
  margin-bottom: 10px;
`;

const StepDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${colors.text.secondary};
`;

const CTAWrapper = styled(motion.div)`
  text-align: center;
`;

const steps = [
  {
    n: '01',
    active: false,
    title: 'Tipster posts a slip',
    desc: 'A verified tipster submits their betting slip code with the odds, sport, and reasoning. No spam — reputation is on the line.',
  },
  {
    n: '02',
    active: true,
    title: 'Buyer pays ₦1,100',
    desc: '₦100 goes to Slipr immediately. ₦1,000 goes into escrow — locked until the slip settles. Zero risk of losing money to a bad tip.',
  },
  {
    n: '03',
    active: false,
    title: 'Win = Pay. Lose = Refund.',
    desc: 'Slip wins? The tipster gets ₦900 from escrow. Slip loses? The buyer gets ₦1,000 back to their wallet. Automatic.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function HowItWorksPreview() {
  return (
    <Section>
      <SectionHeader
        eyebrow="How It Works"
        headline="Simple enough to explain in <em>three steps</em>"
        subtext="No complexity. No fine print. Every transaction is transparent and protected."
      />

      <StepsGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <ConnectorLine />
        {steps.map((step) => (
          <StepCard key={step.n} variants={cardVariants}>
            <StepNumber $active={step.active}>{step.n}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepDesc>{step.desc}</StepDesc>
          </StepCard>
        ))}
      </StepsGrid>

      <CTAWrapper
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <Button as={Link} to="/how-it-works" variant="secondary" size="lg">
          See the full breakdown →
        </Button>
      </CTAWrapper>
    </Section>
  );
}
