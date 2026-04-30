/**
 * ForTipsters — /tipsters route
 * Hero + How to start + Earnings Calculator + Verified Badge + Success Stories + Requirements + CTA
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors as c, spacing, breakpoints, radii } from '../theme';
import PageHero from '../components/shared/PageHero';
import EarningsCalculator from '../components/tipsters/EarningsCalculator';
import VerifiedBadgeInfo from '../components/tipsters/VerifiedBadgeInfo';
import TipsterSuccessStories from '../components/tipsters/TipsterSuccessStories';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import Button from '../components/shared/Button';

const StartSection = styled.section`
  padding: 96px 80px;
  background: ${c.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const StartGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 56px auto 0;

  @media (max-width: ${breakpoints.md}) { grid-template-columns: 1fr; max-width: 480px; }
`;

const StartCard = styled(motion.div)``;

const StartNum = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: ${c.accentLight};
  letter-spacing: -0.05em;
  margin-bottom: 12px;
  background: linear-gradient(135deg, ${c.accent}, rgba(0,194,168,0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StartTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${c.text.primary};
  margin-bottom: 8px;
`;

const StartDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${c.text.secondary};
`;

const RequirementsSection = styled.section`
  padding: 96px 80px;
  background: ${c.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const ReqGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 760px;
  margin: 48px auto 0;

  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const ReqItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 18px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.92);
  border-radius: ${radii.lg};
`;

const ReqIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const ReqText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${c.text.primary};
  line-height: 1.5;
`;

const DownloadSection = styled.section`
  padding: 96px 80px;
  background: ${c.surface};
  text-align: center;

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const startSteps = [
  { n: '01', title: 'Create your account', desc: 'Sign up free with your phone number. No subscription. No waiting for approval.' },
  { n: '02', title: 'Post your first slip', desc: 'Enter your slip code, pick your sport, set your price. Your win rate starts from zero and grows with every result.' },
  { n: '03', title: 'Get paid on wins', desc: 'Every winning slip releases ₦1,000 from escrow to your wallet. Withdraw anytime to your Nigerian bank account.' },
];

const requirements = [
  { icon: '📱', text: 'Valid Nigerian phone number for account verification' },
  { icon: '🏦', text: 'Active Nigerian bank account for withdrawals' },
  { icon: '📸', text: 'Ability to upload result screenshots for settlement' },
  { icon: '🎯', text: 'Genuine betting knowledge — not required, but it pays off' },
  { icon: '⚖️', text: 'Agreement to Slipr\'s tipster conduct guidelines' },
  { icon: '🔞', text: 'Must be 18 years or older to participate' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function ForTipsters() {
  return (
    <main>
      <PageHero
        eyebrow="For Tipsters"
        title="Post your slip.<br /><em>Get paid.</em>"
        subtitle="Turn your betting knowledge into a real income stream. Every winning slip earns you ₦1,000 from escrow — automatically, no chasing needed."
      />

      <StartSection>
        <SectionHeader
          eyebrow="Getting Started"
          headline="You're three steps from your <em>first payout</em>"
          subtext="No complicated setup. No approval waiting period. Start posting within minutes."
        />
        <StartGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {startSteps.map((s) => (
            <StartCard key={s.n} variants={itemVariants}>
              <GlassCard>
                <StartNum>{s.n}</StartNum>
                <StartTitle>{s.title}</StartTitle>
                <StartDesc>{s.desc}</StartDesc>
              </GlassCard>
            </StartCard>
          ))}
        </StartGrid>
      </StartSection>

      <EarningsCalculator />
      <VerifiedBadgeInfo />
      <TipsterSuccessStories />

      <RequirementsSection>
        <SectionHeader
          eyebrow="Requirements"
          headline="What you need to <em>get started</em>"
          subtext="The barrier is low. The standards are high once you're in."
        />
        <ReqGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {requirements.map((r, i) => (
            <ReqItem key={i} variants={itemVariants}>
              <ReqIcon>{r.icon}</ReqIcon>
              <ReqText>{r.text}</ReqText>
            </ReqItem>
          ))}
        </ReqGrid>
      </RequirementsSection>

      <DownloadSection>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.accent, marginBottom: '16px' }}>Ready?</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '16px', color: c.text.primary }}>
            Your winning streak deserves an audience.
          </h2>
          <p style={{ fontSize: '17px', color: c.text.secondary, marginBottom: '32px', maxWidth: '440px', margin: '0 auto 32px' }}>
            Download the Slipr app and post your first slip today. Zero upfront cost.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="xl">Download for iOS</Button>
            <Button variant="secondary" size="xl">Download for Android</Button>
          </div>
        </motion.div>
      </DownloadSection>
    </main>
  );
}
