/**
 * SectionBridge — gamified Three.js portal between pages.
 * Dark full-width section with a live WebGL canvas backdrop,
 * achievement badge, animated heading, subtitle, and a CTA that
 * links to the next logical page. One per page, one consistent style.
 */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import ThreeCanvas from '../three/ThreeCanvas';
import { breakpoints } from '../../theme';

// ─── Animations ───────────────────────────────────────────────────────────────
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const xpPop = keyframes`
  0%   { transform: scale(0.5) translateY(8px); opacity: 0; }
  65%  { transform: scale(1.12) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

// ─── Styled components ────────────────────────────────────────────────────────
const Wrap = styled.section`
  position: relative;
  width: 100%;
  height: 540px;
  background: #080A0E;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.md}) { height: 480px; }
  @media (max-width: ${breakpoints.sm}) { height: 420px; }
`;

/* Left-heavy gradient so text stays readable over the canvas */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 80% at 50% 50%, rgba(8,10,14,0.45) 0%, rgba(8,10,14,0.0) 100%),
    linear-gradient(135deg, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.60) 55%, rgba(8,10,14,0.25) 100%);
  z-index: 1;
`;

const TopFade = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 64px;
  background: linear-gradient(to bottom, rgba(6,6,14,1) 0%, rgba(8,10,14,0) 100%);
  z-index: 3;
`;

const BottomFade = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 64px;
  background: linear-gradient(to top, rgba(6,6,14,1) 0%, rgba(8,10,14,0) 100%);
  z-index: 3;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 28px;
  max-width: 620px;
  width: 100%;
`;

const AchievementBadge = styled(motion.div)`
  position: absolute;
  top: 26px;
  left: 28px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 16px 8px 10px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 999px;

  @media (max-width: ${breakpoints.sm}) { display: none; }
`;

const BadgeIconWrap = styled.div`
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(0,194,168,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

const BadgeMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BadgeLabel = styled.span`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: #00C2A8;
  line-height: 1;
`;

const BadgeName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  line-height: 1;
`;

const Eyebrow = styled(motion.p)`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00C2A8;
  margin-bottom: 14px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(24px, 4vw, 42px);
  font-weight: 800;
  letter-spacing: -0.038em;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 16px;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #00C2A8, #F5A623, #00C2A8);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 15px;
  line-height: 1.65;
  color: rgba(255,255,255,0.50);
  max-width: 460px;
  margin: 0 auto 32px;
`;

const CTARow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #00C2A8;
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s;
  letter-spacing: -0.01em;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(0,194,168,0.38);
  }

  span { transition: transform 0.2s; }
  &:hover span { transform: translateX(3px); }
`;

const XPBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  background: rgba(245,166,35,0.13);
  border: 1px solid rgba(245,166,35,0.28);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #F5A623;
  letter-spacing: 0.03em;
  animation: ${xpPop} 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
  animation-delay: 0.85s;
`;

// ─── Framer Motion variants ───────────────────────────────────────────────────
const badgeVariants = {
  hidden:  { opacity: 0, x: -24, scale: 0.85 },
  visible: { opacity: 1, x: 0,   scale: 1,   transition: { duration: 0.5, ease: [0.23,1,0.32,1], delay: 0.15 } },
};
const eyebrowVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.23,1,0.32,1], delay: 0.28 } },
};
const titleVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.23,1,0.32,1], delay: 0.38 } },
};
const subVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5,  ease: [0.23,1,0.32,1], delay: 0.50 } },
};
const ctaVariants = {
  hidden:  { opacity: 0, y: 10, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.48, ease: [0.23,1,0.32,1], delay: 0.64 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * @param {string}  variant     - Three.js scene key
 * @param {string}  label       - Eyebrow tag (e.g. "NEXT STEP")
 * @param {string}  title       - Main heading — wrap text in <em> for shimmer
 * @param {string}  subtitle    - Supporting text
 * @param {string}  cta         - Button label
 * @param {string}  to          - React Router link destination
 * @param {object}  achievement - { icon: '🔥', text: 'Achievement name' }
 * @param {number}  xp          - XP value shown next to CTA (0 = hide)
 */
export default function SectionBridge({
  variant    = 'vortex',
  label      = 'NEXT STEP',
  title      = 'Continue your journey',
  subtitle   = '',
  cta        = 'Explore →',
  to         = '/',
  achievement = { icon: '⚡', text: 'Unlocked' },
  xp         = 100,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Wrap ref={ref}>
      {/* Live Three.js canvas */}
      <ThreeCanvas variant={variant} />

      {/* Gradient overlays */}
      <Overlay />
      <TopFade />
      <BottomFade />

      {/* Achievement badge (top-left) */}
      <AchievementBadge
        variants={badgeVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <BadgeIconWrap>{achievement.icon}</BadgeIconWrap>
        <BadgeMeta>
          <BadgeLabel>Achievement</BadgeLabel>
          <BadgeName>{achievement.text}</BadgeName>
        </BadgeMeta>
      </AchievementBadge>

      {/* Central content */}
      <Content>
        <Eyebrow variants={eyebrowVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {label}
        </Eyebrow>

        <Title
          variants={titleVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <Subtitle variants={subVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {subtitle}
        </Subtitle>

        <CTARow variants={ctaVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <CTAButton to={to}>
            {cta} <span>→</span>
          </CTAButton>

          {xp > 0 && (
            <XPBadge>✦ +{xp} XP</XPBadge>
          )}
        </CTARow>
      </Content>
    </Wrap>
  );
}
