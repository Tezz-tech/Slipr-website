/**
 * HomeCTA — Final full-width CTA banner on the homepage.
 * Gradient background with animated orbs, bold headline, two buttons.
 * Scroll-triggered fade + scale.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, radii, breakpoints } from '../../theme';
import Button from '../shared/Button';

const Section = styled.section`
  padding: ${spacing.section} 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: ${spacing.section} 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const Banner = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  background: linear-gradient(135deg, ${colors.surface} 0%, ${colors.surfaceElevated} 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 28px;
  padding: 80px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) { padding: 64px 48px; }
  @media (max-width: ${breakpoints.md}) { padding: 48px 24px; }
`;

const OrbLeft = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,194,168,0.18) 0%, transparent 70%);
  pointer-events: none;
`;

const OrbRight = styled.div`
  position: absolute;
  bottom: -120px;
  right: -80px;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%);
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
`;

const Overline = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 20px;
`;

const Headline = styled.h2`
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: #fff;
  margin-bottom: 18px;
`;

const Sub = styled.p`
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.6;
  color: rgba(255,255,255,0.56);
  max-width: 480px;
  margin: 0 auto 40px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const StyledPrimaryBtn = styled(Button)`
  background: ${colors.accent} !important;
  &:hover { background: #00d4b8 !important; }
`;

const StyledGhostBtn = styled(Button)`
  border-color: rgba(255,255,255,0.22) !important;
  color: rgba(255,255,255,0.70) !important;
  &:hover {
    border-color: rgba(255,255,255,0.5) !important;
    color: #fff !important;
    background: rgba(255,255,255,0.06) !important;
  }
`;

export default function HomeCTA() {
  return (
    <Section>
      <Banner
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <OrbLeft />
        <OrbRight />
        <Inner>
          <Overline>Ready to start?</Overline>
          <Headline>Your next slip could pay out.<br />Post it. Get paid.</Headline>
          <Sub>Join thousands of Nigerian tipsters already earning on Slipr. Free to start — no subscription, no flat fees.</Sub>
          <ButtonRow>
            <StyledPrimaryBtn as={Link} to="/tipsters" size="xl">
              Become a Tipster
            </StyledPrimaryBtn>
            <StyledGhostBtn as={Link} to="/buyers" variant="ghost" size="xl">
              Buy a Slip
            </StyledGhostBtn>
          </ButtonRow>
        </Inner>
      </Banner>
    </Section>
  );
}
