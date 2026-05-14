/**
 * TrustSafety — Auto-verified results, dispute system, how to read a tipster profile.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.background};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const TrustGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1060px;
  margin: 56px auto 72px;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: 1fr 1fr; }
  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const TrustCard = styled(motion.div)``;

const TrustIcon = styled.div`
  font-size: 30px;
  margin-bottom: 14px;
`;

const TrustTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const TrustDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${colors.text.secondary};
`;

const ProfileTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};
  text-align: center;
  margin-bottom: 36px;
`;

const MockProfile = styled(motion.div)`
  max-width: 560px;
  margin: 0 auto;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${shadows.md};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const ProfileAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.accent}, #00E5C8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
`;

const ProfileName = styled.h4`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.text.primary};
  margin-bottom: 4px;
`;

const ProfileBadges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: ${radii.pill};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $border }) => $border};
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const ProfileStat = styled.div`
  text-align: center;
  padding: 12px 8px;
  background: ${colors.surface};
  border-radius: ${radii.md};
`;

const ProfileStatVal = styled.div`
  font-size: 17px;
  font-weight: 800;
  color: ${({ $c }) => $c || colors.text.primary};
  letter-spacing: -0.03em;
  margin-bottom: 2px;
`;

const ProfileStatLbl = styled.div`
  font-size: 10px;
  color: ${colors.text.muted};
  font-weight: 500;
`;

const ProfileAnnotations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Annotation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${({ $bg }) => $bg || colors.accentLight};
  border-radius: 8px;
  border-left: 3px solid ${({ $border }) => $border || colors.accent};
`;

const AnnIcon = styled.span`font-size: 14px;`;
const AnnText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.text.secondary};
  flex: 1;
`;
const AnnLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $c }) => $c};
`;

const trustItems = [
  { icon: '📡', title: 'Auto-Verified Results', desc: 'Every settled slip is verified automatically using live sports data — no manual step, no waiting on anyone.' },
  { icon: '⚖️', title: 'Dispute Resolution', desc: 'Any contested result is reviewed by our team within 24 hours. Escrow stays locked until we\'re confident.' },
  { icon: '🚫', title: 'Bad Actor Detection', desc: 'Tipsters who attempt to manipulate results or game the system are permanently banned. No warnings.' },
  { icon: '⭐', title: 'Buyer Reviews', desc: 'Every purchase comes with a review slot. Tipster ratings are calculated from verified buyer feedback only.' },
  { icon: '📊', title: 'Public Win History', desc: 'Every result — win or loss — is recorded permanently on the tipster\'s public profile. No erasing history.' },
  { icon: '🔐', title: 'Secure Payments', desc: 'All transactions are encrypted. Card data is never stored on Slipr\'s servers.' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export default function TrustSafety() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Trust & Safety"
        headline="The systems that keep <em>everyone honest</em>"
        subtext="Accountability isn't optional on Slipr. It's built into the product."
      />

      <TrustGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {trustItems.map((t, i) => (
          <TrustCard key={i} variants={itemVariants}>
            <GlassCard>
              <TrustIcon>{t.icon}</TrustIcon>
              <TrustTitle>{t.title}</TrustTitle>
              <TrustDesc>{t.desc}</TrustDesc>
            </GlassCard>
          </TrustCard>
        ))}
      </TrustGrid>

      <ProfileTitle>How to read a tipster profile</ProfileTitle>
      <MockProfile
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <ProfileHeader>
          <ProfileAvatar>KP</ProfileAvatar>
          <div>
            <ProfileName>KingPunter_NG</ProfileName>
            <ProfileBadges>
              <Badge $bg="rgba(245,166,35,0.12)" $color="#F5A623" $border="rgba(245,166,35,0.24)">⭐ Verified</Badge>
              <Badge $bg={colors.winLight} $color={colors.win} $border="rgba(46,204,113,0.22)">Top Earner</Badge>
              <Badge $bg={colors.accentLight} $color={colors.accent} $border={colors.accentMid}>Football</Badge>
            </ProfileBadges>
          </div>
        </ProfileHeader>

        <ProfileStats>
          <ProfileStat>
            <ProfileStatVal $c={colors.win}>81%</ProfileStatVal>
            <ProfileStatLbl>Win Rate</ProfileStatLbl>
          </ProfileStat>
          <ProfileStat>
            <ProfileStatVal>240</ProfileStatVal>
            <ProfileStatLbl>Slips</ProfileStatLbl>
          </ProfileStat>
          <ProfileStat>
            <ProfileStatVal $c={colors.accent}>₦192K</ProfileStatVal>
            <ProfileStatLbl>Earned</ProfileStatLbl>
          </ProfileStat>
          <ProfileStat>
            <ProfileStatVal>4.8</ProfileStatVal>
            <ProfileStatLbl>Rating</ProfileStatLbl>
          </ProfileStat>
        </ProfileStats>

        <ProfileAnnotations>
          <Annotation $bg={colors.winLight} $border={colors.win}>
            <AnnIcon>✅</AnnIcon>
            <AnnText>Win rate above 60% for 6 consecutive months</AnnText>
            <AnnLabel $c={colors.win}>Good sign</AnnLabel>
          </Annotation>
          <Annotation $bg={colors.accentLight} $border={colors.accent}>
            <AnnIcon>📊</AnnIcon>
            <AnnText>All results auto-verified via live sports data</AnnText>
            <AnnLabel $c={colors.accent}>Verified</AnnLabel>
          </Annotation>
          <Annotation $bg="rgba(245,166,35,0.08)" $border="#F5A623">
            <AnnIcon>💬</AnnIcon>
            <AnnText>4.8 average across 186 buyer reviews</AnnText>
            <AnnLabel $c="#F5A623">Trusted</AnnLabel>
          </Annotation>
        </ProfileAnnotations>
      </MockProfile>
    </Section>
  );
}
