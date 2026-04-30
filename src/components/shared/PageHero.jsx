/**
 * PageHero — Shared hero section for inner pages.
 * Gradient orb background, staggered headline + subtext animation.
 * Used by all pages except Home (which has its own custom hero).
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, fonts, spacing, breakpoints } from '../../theme';

const HeroSection = styled.section`
  min-height: 52vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px ${spacing.xl} 80px;
  position: relative;
  overflow: hidden;
  text-align: center;

  @media (max-width: ${breakpoints.md}) {
    padding: 120px ${spacing.md} 64px;
    min-height: 44vh;
  }
`;

const OrbLeft = styled.div`
  position: absolute;
  top: -80px;
  left: -120px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, ${colors.accentLight} 0%, transparent 70%);
  pointer-events: none;
`;

const OrbRight = styled.div`
  position: absolute;
  bottom: -120px;
  right: -80px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%);
  pointer-events: none;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 760px;
`;

const Eyebrow = styled(motion.span)`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 16px;
  padding: 5px 14px;
  background: ${colors.accentLight};
  border-radius: 999px;
  border: 1px solid ${colors.accentMid};
`;

const Title = styled(motion.h1)`
  font-size: clamp(36px, 6vw, 68px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.06;
  color: ${colors.text.primary};
  margin-bottom: 20px;

  em {
    font-style: normal;
    color: ${colors.accent};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.65;
  color: ${colors.text.secondary};
  max-width: 560px;
  margin: 0 auto;
`;

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <HeroSection>
      <GridOverlay />
      <OrbLeft />
      <OrbRight />
      <Content>
        {eyebrow && (
          <Eyebrow
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {eyebrow}
          </Eyebrow>
        )}
        <Title
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {subtitle}
          </Subtitle>
        )}
      </Content>
    </HeroSection>
  );
}
