/**
 * Hero — Full-viewport homepage hero.
 * Word-by-word headline animation, gradient orb background,
 * floating phone mockup (infinite y keyframes), two CTAs.
 * Subtle dot grid overlay for texture.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, fonts, spacing, breakpoints, radii, shadows } from '../../theme';
import Button from '../shared/Button';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 80px 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) { padding: 120px 40px 80px; }
  @media (max-width: ${breakpoints.md}) { padding: 100px 20px 64px; }
`;

/* Background gradient orbs */
const OrbTeal = styled.div`
  position: absolute;
  top: -200px;
  left: -200px;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,194,168,0.12) 0%, transparent 65%);
  pointer-events: none;
`;

const OrbGold = styled.div`
  position: absolute;
  bottom: -150px;
  right: -100px;
  width: 550px;
  height: 550px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 65%);
  pointer-events: none;
`;

const DotGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(${colors.border} 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 50%, transparent 100%);
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.lg}) { gap: 56px; }
  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
`;

const TextSide = styled.div``;

const EyebrowBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.accent};
  padding: 6px 14px;
  background: ${colors.accentLight};
  border-radius: ${radii.pill};
  border: 1px solid ${colors.accentMid};
  margin-bottom: 24px;
  letter-spacing: 0.02em;
`;

const PulsingDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${colors.accent};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`;

const HeadlineWrapper = styled(motion.div)`
  overflow: hidden;
  margin-bottom: 24px;
`;

const Headline = styled.h1`
  font-size: clamp(44px, 6vw, 78px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.04;
  color: ${colors.text.primary};
`;

const HeadlineAccent = styled.span`
  color: ${colors.accent};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.accentLight};
    border-radius: 2px;
  }
`;

const Subheadline = styled(motion.p)`
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.65;
  color: ${colors.text.secondary};
  max-width: 480px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.md}) { margin: 0 auto 40px; }
`;

const CTARow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.md}) { justify-content: center; }
`;

const TrustLine = styled(motion.p)`
  font-size: 13px;
  color: ${colors.text.muted};
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: ${breakpoints.md}) { justify-content: center; }

  &::before {
    content: '🔒';
    font-size: 13px;
  }
`;

/* Phone mockup */
const PhoneSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${breakpoints.md}) { order: -1; }
`;

const PhoneFloat = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const PhoneShell = styled.div`
  width: 260px;
  height: 520px;
  background: ${colors.text.primary};
  border-radius: 40px;
  padding: 16px 14px;
  box-shadow: 0 40px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.14);
  position: relative;

  /* Phone notch */
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 6px;
    background: rgba(255,255,255,0.08);
    border-radius: 3px;
  }
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #0F0F10;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PhoneStatusBar = styled.div`
  padding: 14px 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusTime = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
`;

const StatusIcons = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${colors.accent};
`;

const PhoneHeader = styled.div`
  padding: 8px 16px 16px;
`;

const AppTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
  margin-bottom: 2px;
`;

const AppSubtitle = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
`;

const SlipCard = styled(motion.div)`
  margin: 0 12px 10px;
  background: #1A1A1C;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.06);
`;

const SlipHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TipsterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const TipsterAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.accent}, #00E5C8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
`;

const TipsterName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
`;

const VerBadge = styled.span`
  font-size: 9px;
  padding: 2px 6px;
  background: rgba(245,166,35,0.15);
  color: #F5A623;
  border-radius: 4px;
  font-weight: 600;
`;

const WinBadge = styled.span`
  font-size: 10px;
  padding: 3px 8px;
  background: rgba(46,204,113,0.15);
  color: ${colors.win};
  border-radius: 6px;
  font-weight: 700;
`;

const SlipCode = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.accent};
  letter-spacing: 0.06em;
  margin-bottom: 8px;
  font-variant-numeric: tabular-nums;
`;

const SlipMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetaTag = styled.span`
  font-size: 10px;
  padding: 3px 7px;
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.55);
  border-radius: 5px;
`;

const PriceTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

const UnlockBtn = styled.div`
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  background: ${colors.accent};
  color: #fff;
  border-radius: 8px;
`;

/* Orbiting elements around phone */
const FloatingBadge = styled(motion.div)`
  position: absolute;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.9);
  border-radius: 14px;
  padding: 10px 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

const BadgeLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const BadgeValue = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ $color }) => $color || colors.accent};
`;

// Word animation variants
const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

const slipCards = [
  { tipster: 'KingPunter', init: 'KP', code: 'BET-7X92A', odds: 'x3.45', sport: 'Football', badge: 'WIN', wins: '78%' },
  { tipster: 'SlipMaster', init: 'SM', code: 'BET-5K21C', odds: 'x2.80', sport: 'Tennis', badge: 'WIN', wins: '82%' },
];

export default function Hero() {
  return (
    <Section>
      <DotGrid />
      <OrbTeal />
      <OrbGold />

      <Inner>
        <TextSide>
          <EyebrowBadge
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <PulsingDot />
            Nigeria's #1 Tip Marketplace
          </EyebrowBadge>

          <HeadlineWrapper>
            <motion.div
              variants={wordContainer}
              initial="hidden"
              animate="visible"
            >
              <Headline>
                {['Post your slip.', ''].map((line, li) => (
                  <React.Fragment key={li}>
                    {line.split(' ').filter(Boolean).map((word, i) => (
                      <motion.span key={i} variants={wordItem} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                        {word}
                      </motion.span>
                    ))}
                    {li === 0 && <br />}
                  </React.Fragment>
                ))}
                <motion.span variants={wordItem} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                  Get{' '}
                </motion.span>
                <motion.span variants={wordItem} style={{ display: 'inline-block' }}>
                  <HeadlineAccent>paid.</HeadlineAccent>
                </motion.span>
              </Headline>
            </motion.div>
          </HeadlineWrapper>

          <Subheadline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
          >
            Buy and sell betting tips with escrow protection.
            Your ₦1,100 is safe — refunded automatically if the slip loses.
          </Subheadline>

          <CTARow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <Button as={Link} to="/tipsters" size="xl">
              Start Earning
            </Button>
            <Button as={Link} to="/how-it-works" variant="secondary" size="xl">
              See How It Works
            </Button>
          </CTARow>

          <TrustLine
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Escrow-protected. Verified tipsters. Instant refunds.
          </TrustLine>
        </TextSide>

        <PhoneSide>
          <PhoneFloat
            animate={{ y: [-12, 0, -12] }}
            transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <PhoneShell>
              <PhoneScreen>
                <PhoneStatusBar>
                  <StatusTime>9:41</StatusTime>
                  <StatusIcons>
                    <StatusDot />
                    <StatusDot style={{ background: 'rgba(255,255,255,0.3)', width: '5px', height: '5px' }} />
                    <StatusDot style={{ background: 'rgba(255,255,255,0.3)', width: '5px', height: '5px' }} />
                  </StatusIcons>
                </PhoneStatusBar>

                <PhoneHeader>
                  <AppTitle>Slipr</AppTitle>
                  <AppSubtitle>Trending slips today</AppSubtitle>
                </PhoneHeader>

                {slipCards.map((card, i) => (
                  <SlipCard
                    key={card.code}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.18, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <SlipHeader>
                      <TipsterInfo>
                        <TipsterAvatar>{card.init}</TipsterAvatar>
                        <div>
                          <TipsterName>{card.tipster}</TipsterName>
                          <VerBadge>⭐ Verified</VerBadge>
                        </div>
                      </TipsterInfo>
                      <WinBadge>{card.wins} WIN</WinBadge>
                    </SlipHeader>
                    <SlipCode>{card.code}</SlipCode>
                    <SlipMeta>
                      <MetaTag>{card.sport}</MetaTag>
                      <MetaTag>Odds {card.odds}</MetaTag>
                      <MetaTag>Today</MetaTag>
                    </SlipMeta>
                    <PriceTag>
                      <Price>₦1,100</Price>
                      <UnlockBtn>Unlock</UnlockBtn>
                    </PriceTag>
                  </SlipCard>
                ))}
              </PhoneScreen>
            </PhoneShell>

            {/* Floating badges */}
            <FloatingBadge
              style={{ top: '60px', left: '-120px' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span style={{ fontSize: '18px' }}>💰</span>
              <div>
                <div style={{ fontSize: '10px', color: colors.text.muted, fontWeight: 500 }}>Earned today</div>
                <BadgeValue $color={colors.win}>₦48,000</BadgeValue>
              </div>
            </FloatingBadge>

            <FloatingBadge
              style={{ bottom: '120px', right: '-110px' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span style={{ fontSize: '18px' }}>🛡️</span>
              <div>
                <div style={{ fontSize: '10px', color: colors.text.muted, fontWeight: 500 }}>Refund rate</div>
                <BadgeValue>100%</BadgeValue>
              </div>
            </FloatingBadge>
          </PhoneFloat>
        </PhoneSide>
      </Inner>
    </Section>
  );
}
