/**
 * Team — Placeholder team cards with role titles.
 * Values section with 4 value cards and icons.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 56px auto 96px;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr 1fr; }
`;

const TeamCard = styled(motion.div)`
  text-align: center;
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 0 auto 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
`;

const MemberName = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 4px;
`;

const MemberRole = styled.p`
  font-size: 13px;
  color: ${colors.text.muted};
`;

const ValuesTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: ${colors.text.primary};
  letter-spacing: -0.03em;
  margin-bottom: 36px;
`;

const ValuesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr 1fr; }
`;

const ValueCard = styled(motion.div)``;

const ValueIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

const ValueName = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 7px;
  letter-spacing: -0.02em;
`;

const ValueDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.text.secondary};
`;

const team = [
  { name: 'Emeka Okafor', init: 'EO', role: 'Founder & CEO', bg: 'linear-gradient(135deg,#00C2A8,#009980)' },
  { name: 'Funmi Adeyemi', init: 'FA', role: 'Lead Engineer', bg: 'linear-gradient(135deg,#3498DB,#2980B9)' },
  { name: 'Chidi Eze', init: 'CE', role: 'Head of Product', bg: 'linear-gradient(135deg,#9B59B6,#8E44AD)' },
  { name: 'Ngozi Obi', init: 'NO', role: 'Growth & Marketing', bg: 'linear-gradient(135deg,#F5A623,#E67E22)' },
];

const values = [
  { icon: '🛡️', name: 'Accountability first', desc: 'Every feature we ship must increase accountability for either the tipster or Slipr itself.' },
  { icon: '🌍', name: 'Nigerian by design', desc: 'We build for Nigerian networks, Nigerian banks, Nigerian culture — not a global template.' },
  { icon: '🔍', name: 'Radical transparency', desc: 'Every win rate, every result, every policy is publicly visible. Nothing hidden behind a login.' },
  { icon: '⚖️', name: 'Fair to both sides', desc: 'We never favor buyers over tipsters or vice versa. The escrow system is neutral by design.' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function Team() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The Team"
        headline="Built by people who've <em>felt the problem</em>"
        subtext="We're a small team of builders, analysts, and designers obsessed with trust and transparency."
      />

      {/* <TeamGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {team.map((member, i) => (
          <TeamCard key={i} variants={itemVariants}>
            <GlassCard padding="24px 20px">
              <AvatarPlaceholder $bg={member.bg}>{member.init}</AvatarPlaceholder>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </GlassCard>
          </TeamCard>
        ))}
      </TeamGrid> */}

      <ValuesTitle>What we stand for</ValuesTitle>
      <ValuesGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {values.map((v, i) => (
          <ValueCard key={i} variants={itemVariants}>
            <GlassCard>
              <ValueIcon>{v.icon}</ValueIcon>
              <ValueName>{v.name}</ValueName>
              <ValueDesc>{v.desc}</ValueDesc>
            </GlassCard>
          </ValueCard>
        ))}
      </ValuesGrid>
    </Section>
  );
}
