/**
 * SectionHeader — Reusable section title block with eyebrow, headline, and subtext.
 * Scroll-triggered fade-up animation with Framer Motion whileInView.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, fonts, breakpoints } from '../../theme';

const Wrapper = styled(motion.div)`
  text-align: ${({ $align }) => $align || 'center'};
  max-width: ${({ $maxWidth }) => $maxWidth || '640px'};
  margin: ${({ $align }) => $align === 'left' ? '0' : '0 auto'};
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 12px;
  padding: 5px 12px;
  background: ${colors.accentLight};
  border-radius: 999px;
  border: 1px solid ${colors.accentMid};
`;

const Headline = styled.h2`
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: ${colors.text.primary};
  margin-bottom: ${({ $subtext }) => $subtext ? '16px' : '0'};

  em {
    font-style: normal;
    color: ${colors.accent};
  }
`;

const Subtext = styled.p`
  font-size: clamp(15px, 1.8vw, 18px);
  font-weight: 400;
  line-height: 1.65;
  color: ${colors.text.secondary};
`;

export default function SectionHeader({ eyebrow, headline, subtext, align, maxWidth }) {
  return (
    <Wrapper
      $align={align}
      $maxWidth={maxWidth}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Headline $subtext={!!subtext} dangerouslySetInnerHTML={{ __html: headline }} />
      {subtext && <Subtext>{subtext}</Subtext>}
    </Wrapper>
  );
}
