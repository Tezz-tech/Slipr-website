/**
 * FAQAccordion — Tab switcher between FAQ categories.
 * AnimatePresence for tab change + accordion expand/collapse.
 * 5+ real questions per category.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';

const Wrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 0 80px 96px;

  @media (max-width: ${breakpoints.lg}) { padding: 0 40px 80px; }
  @media (max-width: ${breakpoints.md}) { padding: 0 20px 72px; }
`;

const TabsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const TabBtn = styled.button`
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  border-radius: ${radii.pill};
  border: 1.5px solid ${({ $active }) => $active ? colors.accent : colors.border};
  background: ${({ $active }) => $active ? colors.accentLight : 'transparent'};
  color: ${({ $active }) => $active ? colors.accent : colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: -0.01em;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;

const AccordionList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
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
  gap: 16px;
  letter-spacing: -0.01em;
`;

const ChevronIcon = styled(motion.span)`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ $open }) => $open ? colors.accentLight : colors.surface};
  color: ${({ $open }) => $open ? colors.accent : colors.text.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  transition: background 0.2s, color 0.2s;
`;

const Answer = styled(motion.div)`overflow: hidden;`;
const AnswerInner = styled.div`
  padding: 0 24px 20px;
  font-size: 14px;
  line-height: 1.75;
  color: ${colors.text.secondary};

  a { color: ${colors.accent}; font-weight: 500; }
`;

const categories = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      { q: 'What is Slipr?', a: 'Slipr is Nigeria\'s first escrow-backed betting tip marketplace. Tipsters post their slip codes and get paid ₦1,000 from escrow when their slips win. Buyers pay ₦1,100 to unlock a slip — ₦100 platform fee, ₦1,000 protected in escrow until the result.' },
      { q: 'Is Slipr legal in Nigeria?', a: 'Yes. Slipr operates as a digital marketplace connecting buyers and sellers of sports analysis content. We don\'t operate a betting platform or take bets directly. All tip purchases are for informational/advisory content. We comply with Nigerian regulations on digital services.' },
      { q: 'Do I need to be good at betting to use Slipr?', a: 'Not at all. If you\'re a buyer, you\'re relying on tipsters\' expertise. Your only job is to choose wisely — our profiles, win rates, and reviews give you everything you need to make that call.' },
      { q: 'Is Slipr available on web or only as an app?', a: 'The full Slipr experience is available through the iOS and Android apps. A web version is in development. The marketing site you\'re on now is for information — transactions happen in the app.' },
      { q: 'How does Slipr make money?', a: 'Slipr earns ₦100 from every slip unlock. That\'s it. No percentage of winnings, no subscription, no advertising. Our business model is directly aligned with platform activity — we earn when both sides are active.' },
      { q: 'Can I be both a tipster and a buyer on the same account?', a: 'Yes. Many of our users both post their own slips and buy slips from other tipsters. Your tipster wallet and buyer wallet are separate but managed from the same account.' },
    ],
  },
  {
    id: 'buyers',
    label: 'For Buyers',
    faqs: [
      { q: 'What exactly does ₦100 pay for?', a: 'The ₦100 platform fee is Slipr\'s service charge for running the marketplace — escrow management, result verification, customer support, and payment processing. It\'s non-refundable because the service was rendered regardless of the outcome.' },
      { q: 'What happens if I buy a slip and it\'s for an event that already started?', a: 'You should always check the event time before purchasing. If you buy a slip for a live or completed event, no refund will be issued. We display the event time on every slip listing — verify before you pay.' },
      { q: 'How quickly does my refund arrive after a loss?', a: 'Refunds are processed automatically within minutes of a verified loss result. In rare cases involving disputed results or manual verification, it may take up to 24 hours.' },
      { q: 'Can I see the slip code before paying?', a: 'No. The slip code is hidden until you pay. You can see the tipster\'s profile, win rate, sport, odds range, and reasoning before purchasing — but the actual code is revealed only after unlock.' },
      { q: 'What if the tipster posts a fake or wrong code?', a: 'If a tipster deliberately submits an invalid or incorrect slip code, we offer a full refund of ₦1,100 (including the platform fee). You can report this in the app and our team investigates within 24 hours.' },
      { q: 'How do I choose a good tipster?', a: 'Look at win rate over a minimum of 30+ slips (small sample sizes are unreliable), check their sport specialisation, read recent buyer reviews, and look for the Verified badge — it means they\'ve met our consistency standards.' },
    ],
  },
  {
    id: 'tipsters',
    label: 'For Tipsters',
    faqs: [
      { q: 'When exactly does escrow release my payment?', a: 'After the event ends, our system automatically cross-checks the result against live sports data. Once confirmed — typically within 15 minutes — ₦900 per winning buyer is credited to your wallet.' },
      { q: 'Can I post multiple slips for the same event?', a: 'Yes. You can post as many slips as you like simultaneously. Each slip is individually priced and settled. However, be aware that buyers will see your win rate across all slips — posting low-quality slips will hurt your overall record.' },
      { q: 'What happens to my escrow payment if only 1 out of 10 buyers have paid by kickoff?', a: 'Each buyer who unlocks your slip represents a separate escrow. If 10 buyers unlock it and it wins, you receive ₦10,000 (₦1,000 × 10). Settlement is per-buyer, not per-slip.' },
      { q: 'Can I delete a slip after someone has bought it?', a: 'No. Once a buyer has unlocked a slip, the code is revealed and the transaction is binding. You cannot edit or delete settled slips. Unsold slips can be taken down before their first purchase.' },
      { q: 'How long does it take to get the Verified badge?', a: 'There\'s no fixed timeline — it depends on your activity. Meet the criteria (50+ slips, 60%+ win rate, 4.2+ rating, no disputes in 90 days) and the badge is automatically awarded within 24 hours of qualifying.' },
      { q: 'Does a lost slip affect my win rate permanently?', a: 'Yes. Every slip result — win or loss — is permanent and public. This is intentional. It prevents tipsters from cherry-picking their results. Your honest track record is what builds buyer trust over time.' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    faqs: [
      { q: 'What payment methods are accepted?', a: 'Currently we accept Nigerian debit/credit cards (Visa, Mastercard, Verve) and bank transfers via Paystack. We\'re adding USSD and mobile money support in a future update.' },
      { q: 'How long do bank withdrawals take?', a: 'Withdrawals to Nigerian bank accounts are processed instantly, 24/7. In rare cases with high-volume periods, it may take up to 2 hours. There\'s a flat ₦50 fee per withdrawal.' },
      { q: 'Is there a minimum balance to withdraw?', a: 'There\'s no minimum balance required to initiate a withdrawal. Even ₦200 in your wallet can be withdrawn, subject to the ₦50 transfer fee.' },
      { q: 'What happens to wallet funds if I close my account?', a: 'Any positive wallet balance can be withdrawn before account closure. We don\'t hold funds after a closure request. Balances under ₦50 (below withdrawal fee threshold) can be refunded via a special request to support.' },
      { q: 'Is my payment information stored on Slipr?', a: 'No. Card numbers and bank credentials are never stored on Slipr\'s servers. All payment processing is handled by Paystack, which is PCI-DSS compliant. We only store a tokenised reference for transaction history.' },
    ],
  },
  {
    id: 'safety',
    label: 'Trust & Safety',
    faqs: [
      { q: 'How are results verified?', a: 'Results are verified automatically using live sports data from official sources — no manual uploads, no human bias. The system cross-references the slip code with confirmed match outcomes. Tipsters cannot alter or influence the outcome. Any mismatch triggers an automatic review and the tipster account is flagged.' },
      { q: 'What if a tipster disputes a loss result?', a: 'Tipsters can raise a dispute within 2 hours of a result being marked. Our team reviews both sides\' evidence within 24 hours. During review, escrow stays locked — no refunds or payouts until the dispute is resolved.' },
      { q: 'Can a tipster run away after getting paid?', a: 'The escrow model makes "running away" structurally impossible. The tipster never holds your money. It sits with Slipr until the result. If they win, they get paid automatically. If they lose, you get refunded automatically. No human intervention needed on either side.' },
      { q: 'Are minors prevented from using the platform?', a: 'Yes. Account verification requires a phone number and at a minimum age-gate of 18. We\'re implementing BVN-linked age verification for higher-volume accounts. Using the platform under 18 is a violation of our Terms of Service.' },
      { q: 'How do I report suspicious activity?', a: 'Use the "Report" button on any profile, slip, or transaction. You can also email trust@slipr.ng or use the in-app support chat. Reports are reviewed within 4 business hours for high-severity issues.' },
    ],
  },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } },
};

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <Item>
      <Question onClick={onToggle} aria-expanded={isOpen}>
        {faq.q}
        <ChevronIcon $open={isOpen} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ↓
        </ChevronIcon>
      </Question>
      <AnimatePresence initial={false}>
        {isOpen && (
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
  );
}

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openIndex, setOpenIndex] = useState(null);

  const current = categories.find((c) => c.id === activeCategory);

  const handleTabChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <Wrapper>
      <TabsRow>
        {categories.map((cat) => (
          <TabBtn
            key={cat.id}
            $active={activeCategory === cat.id}
            onClick={() => handleTabChange(cat.id)}
          >
            {cat.label}
          </TabBtn>
        ))}
      </TabsRow>

      <AnimatePresence mode="wait">
        <AccordionList
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
        >
          {current.faqs.map((faq, i) => (
            <motion.div key={i} variants={itemVariants}>
              <AccordionItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </AccordionList>
      </AnimatePresence>
    </Wrapper>
  );
}
