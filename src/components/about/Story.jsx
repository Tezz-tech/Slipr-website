/**
 * Story — Origin story of Slipr in punchy narrative paragraphs.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, breakpoints } from '../../theme';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Eyebrow = styled(motion.p)`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.accent};
  margin-bottom: 20px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${colors.text.primary};
  margin-bottom: 40px;
`;

const Paragraph = styled(motion.p)`
  font-size: 17px;
  line-height: 1.8;
  color: ${colors.text.secondary};
  margin-bottom: 24px;

  strong {
    color: ${colors.text.primary};
    font-weight: 600;
  }

  em {
    color: ${colors.accent};
    font-style: normal;
    font-weight: 600;
  }
`;

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function Story() {
  return (
    <Section>
      <Inner
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <Eyebrow variants={fadeUp}>Our Story</Eyebrow>
        <Title variants={fadeUp}>Born out of a ₦5,000 mistake.</Title>

        <Paragraph variants={fadeUp}>
          Our founder paid <strong>₦5,000</strong> for a "sure banker" in a WhatsApp group. The tipster had 800 members, a profile photo, and screenshots from previous wins. The slip lost. The group was deleted. The tipster vanished.
        </Paragraph>

        <Paragraph variants={fadeUp}>
          That story is not unique. <strong>Millions of Nigerians</strong> have a version of it. The market for sports tips is enormous — but it runs entirely on trust, and trust is the one thing that's hardest to verify in a WhatsApp group.
        </Paragraph>

        <Paragraph variants={fadeUp}>
          We built Slipr to solve one specific thing: <em>make it impossible for a tipster to get paid for a slip they didn't win</em>. Everything else — the profiles, the verification, the reviews — flows from that one commitment.
        </Paragraph>

        <Paragraph variants={fadeUp}>
          Today, Slipr is Nigeria's only escrow-backed betting tip marketplace. Every transaction is protected, every result is recorded, and every honest tipster finally has a platform that rewards their performance — not just their pitch.
        </Paragraph>
      </Inner>
    </Section>
  );
}
