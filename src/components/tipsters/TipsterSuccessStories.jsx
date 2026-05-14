/**
 * TipsterSuccessStories — Carousel of tipster profile cards.
 * Auto-scrolling with manual dot navigation.
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const CarouselWrapper = styled.div`
  max-width: 860px;
  margin: 56px auto 0;
  position: relative;
`;

const Card = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 40px;
  box-shadow: ${shadows.md};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px;
  align-items: start;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 28px;
  }
`;

const AvatarWrapper = styled.div`
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 10px;
  position: relative;
`;

const VerifiedRing = styled.div`
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 3px solid #F5A623;
`;

const VerifiedLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #F5A623;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const InfoSide = styled.div``;

const Name = styled.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};
  margin-bottom: 6px;
`;

const Title = styled.p`
  font-size: 13px;
  color: ${colors.text.muted};
  margin-bottom: 20px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const Stat = styled.div`
  background: ${colors.surface};
  border-radius: ${radii.md};
  padding: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ $color }) => $color || colors.text.primary};
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: ${colors.text.muted};
  font-weight: 500;
`;

const Quote = styled.blockquote`
  font-size: 15px;
  line-height: 1.65;
  color: ${colors.text.secondary};
  font-style: italic;
  border-left: 3px solid ${colors.accent};
  padding-left: 14px;
`;

const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
`;

const Dot = styled.button`
  width: ${({ $active }) => $active ? '24px' : '8px'};
  height: 8px;
  border-radius: ${radii.pill};
  background: ${({ $active }) => $active ? colors.accent : colors.border};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: width 0.25s, background 0.2s;
`;

const stories = [
  {
    name: 'KingPunter_NG',
    init: 'KP',
    bg: 'linear-gradient(135deg,#00C2A8,#00E5C8)',
    title: 'Lagos-based football analyst · Verified Tipster',
    winRate: '81%',
    totalSlips: '240',
    earned: '₦192K',
    winColor: colors.win,
    quote: 'I used to share tips in WhatsApp groups for free and nobody believed me when I won. On Slipr, every win goes on my permanent record. My buyers know what they\'re getting.',
    verified: true,
  },
  {
    name: 'SlipQueenAbi',
    init: 'SQ',
    bg: 'linear-gradient(135deg,#E74C3C,#C0392B)',
    title: 'Sports bettor · Tennis & Basketball specialist · Verified',
    winRate: '78%',
    totalSlips: '310',
    earned: '₦248K',
    winColor: colors.win,
    quote: 'The escrow system changed everything. Before Slipr I\'d give tips and buyers would ghost me if they won. Now the platform handles the payout — I just focus on my analysis.',
    verified: true,
  },
  {
    name: 'OddsWhisperer',
    init: 'OW',
    bg: 'linear-gradient(135deg,#3498DB,#2980B9)',
    title: 'Data-driven tipster · 4 sports · Lagos & Abuja',
    winRate: '84%',
    totalSlips: '402',
    earned: '₦320K',
    winColor: colors.win,
    quote: 'I was skeptical about the escrow model but it actually makes me sharper. I only post when I\'m confident — because a loss costs me reputation, not just a refund.',
    verified: true,
  },
];

export default function TipsterSuccessStories() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % stories.length), 5000);
    return () => clearInterval(t);
  }, []);

  const story = stories[active];

  return (
    <Section>
      <SectionHeader
        eyebrow="Success Stories"
        headline="Real tipsters. <em>Real results.</em>"
        subtext="These are the people who turned their sports knowledge into a legitimate income stream."
      />
      <CarouselWrapper>
        <AnimatePresence mode="wait">
          <Card
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            <AvatarWrapper>
              <Avatar $bg={story.bg}>
                {story.init}
                {story.verified && <VerifiedRing />}
              </Avatar>
              {story.verified && <VerifiedLabel>⭐ Verified</VerifiedLabel>}
            </AvatarWrapper>
            <InfoSide>
              <Name>{story.name}</Name>
              <Title>{story.title}</Title>
              <Stats>
                <Stat>
                  <StatValue $color={colors.win}>{story.winRate}</StatValue>
                  <StatLabel>Win Rate</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{story.totalSlips}</StatValue>
                  <StatLabel>Slips</StatLabel>
                </Stat>
                <Stat>
                  <StatValue $color={colors.accent}>{story.earned}</StatValue>
                  <StatLabel>Earned</StatLabel>
                </Stat>
              </Stats>
              <Quote>"{story.quote}"</Quote>
            </InfoSide>
          </Card>
        </AnimatePresence>

        <DotsRow>
          {stories.map((_, i) => (
            <Dot key={i} $active={i === active} onClick={() => setActive(i)} aria-label={`Story ${i + 1}`} />
          ))}
        </DotsRow>
      </CarouselWrapper>
    </Section>
  );
}
