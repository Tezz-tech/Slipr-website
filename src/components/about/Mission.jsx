/**
 * Mission — Bold mission statement with teal accent and problem/solution split.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const MissionStatement = styled(motion.div)`
  max-width: 860px;
  margin: 0 auto 80px;
  text-align: center;
`;

const MissionLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.accent};
  margin-bottom: 20px;
`;

const MissionText = styled.h2`
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${colors.text.primary};

  em {
    font-style: normal;
    color: ${colors.accent};
  }
`;

const ProblemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.md}) { grid-template-columns: 1fr; }
`;

const ProblemCard = styled(motion.div)`
  background: rgba(231,76,60,0.05);
  border: 1px solid rgba(231,76,60,0.14);
  border-radius: ${radii.xl};
  padding: 32px;
`;

const SolutionCard = styled(motion.div)`
  background: ${colors.accentLight};
  border: 1px solid ${colors.accentMid};
  border-radius: ${radii.xl};
  padding: 32px;
`;

const CardIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
  color: ${({ $color }) => $color || colors.text.primary};
`;

const CardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const CardListItem = styled.li`
  font-size: 14px;
  line-height: 1.55;
  color: ${colors.text.secondary};
  display: flex;
  gap: 8px;

  &::before {
    content: ${({ $bullet }) => `'${$bullet}'`};
    flex-shrink: 0;
  }
`;

export default function Mission() {
  return (
    <Section>
      <MissionStatement
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <MissionLabel>Our Mission</MissionLabel>
        <MissionText>
          To make every betting tip <em>accountable</em> — and every honest tipster <em>paid</em>.
        </MissionText>
      </MissionStatement>

      <ProblemGrid>
        <ProblemCard
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <CardIcon>❌</CardIcon>
          <CardTitle $color={colors.loss}>The problem we inherited</CardTitle>
          <CardList>
            <CardListItem $bullet="—">Tipsters post codes in WhatsApp groups — no accountability if they lose</CardListItem>
            <CardListItem $bullet="—">Buyers pay upfront in cash with zero protection</CardListItem>
            <CardListItem $bullet="—">Fraud is rampant — fake screenshots, made-up wins</CardListItem>
            <CardListItem $bullet="—">No public record of a tipster's actual performance</CardListItem>
            <CardListItem $bullet="—">Good tipsters can't build a reputation across the market</CardListItem>
          </CardList>
        </ProblemCard>

        <SolutionCard
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <CardIcon>✅</CardIcon>
          <CardTitle $color={colors.accent}>How Slipr fixes it</CardTitle>
          <CardList>
            <CardListItem $bullet="→">Escrow holds payment — tipster only earns when they're right</CardListItem>
            <CardListItem $bullet="→">Buyers get a full refund when slips lose</CardListItem>
            <CardListItem $bullet="→">Auto-verified results via live sports data before any escrow releases</CardListItem>
            <CardListItem $bullet="→">Permanent, tamper-proof public record of every result</CardListItem>
            <CardListItem $bullet="→">Verified badges reward consistency, not just marketing</CardListItem>
          </CardList>
        </SolutionCard>
      </ProblemGrid>
    </Section>
  );
}
