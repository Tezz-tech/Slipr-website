/**
 * PricingFAQ — Accordion FAQ specific to pricing questions.
 * AnimatePresence for smooth expand/collapse.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const List = styled(motion.div)`
  max-width: 720px;
  margin: 48px auto 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  background: rgba(255,255,255,0.84);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: ${radii.lg};
  overflow: hidden;
  box-shadow: ${shadows.xs};
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: ${colors.text.primary};
  letter-spacing: -0.01em;
  gap: 16px;
`;

const ChevronIcon = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ $open }) => $open ? colors.accentLight : colors.surface};
  color: ${({ $open }) => $open ? colors.accent : colors.text.muted};
  font-size: 13px;
  flex-shrink: 0;
  transition: background 0.2s, color 0.2s;
`;

const Answer = styled(motion.div)`
  overflow: hidden;
`;

const AnswerInner = styled.div`
  padding: 0 24px 20px;
  font-size: 14px;
  line-height: 1.7;
  color: ${colors.text.secondary};
`;

const faqs = [
  { q: 'Is the ₦100 platform fee ever refunded?', a: 'No. The ₦100 platform fee is non-refundable in all circumstances. It\'s Slipr\'s only guaranteed revenue per transaction and covers infrastructure, payment processing, and support costs. It\'s deducted immediately when you pay.' },
  { q: 'How much does a tipster earn per winning slip?', a: 'A tipster earns ₦1,000 per winning slip, released from escrow. If they sell the same slip to 50 buyers, they earn ₦50,000 for a single correct prediction. The more buyers unlock the slip before it settles, the higher the payout.' },
  { q: 'Are there any other fees on top of ₦1,100?', a: 'No. ₦1,100 is the all-in price per slip unlock. There are no subscription fees, no monthly charges, no hidden service charges, and no markup on tips. Tipsters set their own prices (minimum ₦1,100).' },
  { q: 'What are the withdrawal fees?', a: 'Withdrawals to Nigerian bank accounts incur a flat ₦50 transfer fee per withdrawal, regardless of amount. This covers the cost of the instant bank transfer. There\'s no minimum withdrawal amount.' },
  { q: 'Can tipsters set their own price above ₦1,100?', a: 'Yes. ₦1,100 is the minimum. Verified tipsters with strong track records often charge more — up to ₦5,000+ per slip. The higher price comes with higher buyer expectations, so your win rate needs to back it up.' },
  { q: 'Does Slipr take a percentage of tipster winnings?', a: 'No percentage cut on winnings. Tipsters receive the full ₦1,000 (or whatever the escrow amount is for their priced slip) when they win. Slipr\'s only revenue is the flat ₦100 platform fee paid by the buyer at unlock time.' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Section>
      <SectionHeader
        eyebrow="Pricing FAQ"
        headline="Every money question, <em>answered</em>"
      />
      <List
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {faqs.map((faq, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Item>
              <Question
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <ChevronIcon $open={openIndex === i} animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  ↓
                </ChevronIcon>
              </Question>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <Answer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <AnswerInner>{faq.a}</AnswerInner>
                  </Answer>
                )}
              </AnimatePresence>
            </Item>
          </motion.div>
        ))}
      </List>
    </Section>
  );
}
