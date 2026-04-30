/**
 * EscrowDiagram — Animated SVG path escrow flow diagram.
 * Three nodes: Buyer → Escrow → Tipster/Refund.
 * SVG path drawing animation with pathLength motion value.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import GlassCard from '../shared/GlassCard';

const DiagramWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto 80px;
`;

const Title = styled(motion.h3)`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};
  text-align: center;
  margin-bottom: 48px;

  em { color: ${colors.accent}; font-style: normal; }
`;

const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  align-items: center;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Node = styled(motion.div)`
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: ${radii.xl};
  padding: 28px 20px;
  text-align: center;
  box-shadow: ${shadows.sm};
`;

const NodeIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const NodeLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 6px;
  letter-spacing: -0.02em;
`;

const NodeSub = styled.div`
  font-size: 12px;
  color: ${colors.text.muted};
  line-height: 1.5;
`;

const NodeAmount = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${({ $color }) => $color || colors.accent};
  letter-spacing: -0.03em;
  margin: 8px 0 4px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 8px;

  @media (max-width: ${breakpoints.md}) { display: none; }
`;

const ArrowSVG = styled(motion.svg)`
  width: 60px;
  height: 24px;
`;

const ArrowLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${colors.accent};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const EscrowNode = styled(motion.div)`
  background: ${colors.text.primary};
  border-radius: ${radii.xl};
  padding: 28px 20px;
  text-align: center;
  box-shadow: ${shadows.lg}, 0 0 0 2px ${colors.accentMid};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0,194,168,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const EscrowLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
`;

const EscrowSub = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.50);
  line-height: 1.5;
`;

const EscrowAmount = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.accent};
  letter-spacing: -0.03em;
  margin: 10px 0 4px;
`;

const EscrowIcon = styled.div`
  font-size: 30px;
  margin-bottom: 12px;
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 900px;
  margin: 32px auto 0;

  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const OutcomeCard = styled(motion.div)`
  border-radius: ${radii.lg};
  padding: 22px;
  border: 1px solid ${({ $type }) => $type === 'win' ? 'rgba(46,204,113,0.24)' : 'rgba(231,76,60,0.20)'};
  background: ${({ $type }) => $type === 'win' ? 'rgba(46,204,113,0.06)' : 'rgba(231,76,60,0.05)'};
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const OutcomeIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

const OutcomeText = styled.div``;

const OutcomeTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ $type }) => $type === 'win' ? colors.win : colors.loss};
  margin-bottom: 5px;
`;

const OutcomeDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.text.secondary};
`;

export default function EscrowDiagram() {
  return (
    <DiagramWrapper>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        How <em>escrow</em> protects every transaction
      </Title>

      <FlowGrid>
        <Node
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <NodeIcon>👤</NodeIcon>
          <NodeLabel>Buyer</NodeLabel>
          <NodeAmount>₦1,100</NodeAmount>
          <NodeSub>Total payment<br />at unlock</NodeSub>
        </Node>

        <ArrowWrapper>
          <ArrowSVG viewBox="0 0 60 24" fill="none">
            <motion.path
              d="M0 12 H52 M44 4 L52 12 L44 20"
              stroke={colors.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
          </ArrowSVG>
          <ArrowLabel>₦100 fee + ₦1,000</ArrowLabel>
        </ArrowWrapper>

        <EscrowNode
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <EscrowIcon>🔒</EscrowIcon>
          <EscrowLabel>Slipr Escrow</EscrowLabel>
          <EscrowAmount>₦1,000</EscrowAmount>
          <EscrowSub>Locked until result<br />confirmed</EscrowSub>
        </EscrowNode>

        <ArrowWrapper>
          <ArrowSVG viewBox="0 0 60 24" fill="none">
            <motion.path
              d="M0 12 H52 M44 4 L52 12 L44 20"
              stroke={colors.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </ArrowSVG>
          <ArrowLabel>On result</ArrowLabel>
        </ArrowWrapper>

        <Node
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <NodeIcon>⚖️</NodeIcon>
          <NodeLabel>Result</NodeLabel>
          <NodeAmount $color={colors.text.secondary}>?</NodeAmount>
          <NodeSub>Auto-settled<br />by platform</NodeSub>
        </Node>
      </FlowGrid>

      <OutcomeGrid>
        <OutcomeCard
          $type="win"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <OutcomeIcon>🏆</OutcomeIcon>
          <OutcomeText>
            <OutcomeTitle $type="win">Slip Wins</OutcomeTitle>
            <OutcomeDesc>The ₦1,000 in escrow is released to the tipster's wallet. The buyer keeps their betting winnings from their own bet.</OutcomeDesc>
          </OutcomeText>
        </OutcomeCard>

        <OutcomeCard
          $type="loss"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <OutcomeIcon>↩️</OutcomeIcon>
          <OutcomeText>
            <OutcomeTitle $type="loss">Slip Loses</OutcomeTitle>
            <OutcomeDesc>The ₦1,000 is automatically refunded to the buyer's Slipr wallet. The tipster earns nothing — accountability built in.</OutcomeDesc>
          </OutcomeText>
        </OutcomeCard>
      </OutcomeGrid>
    </DiagramWrapper>
  );
}
