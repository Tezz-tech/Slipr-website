/**
 * BlogGrid — 3-column grid of blog cards from static data.
 * Stagger animation on scroll.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, breakpoints } from '../../theme';
import BlogCard from './BlogCard';

const Section = styled.section`
  padding: 0 80px 96px;

  @media (max-width: ${breakpoints.lg}) { padding: 0 40px 80px; }
  @media (max-width: ${breakpoints.md}) { padding: 0 20px 72px; }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const blogPosts = [
  {
    id: 1,
    category: 'Guide',
    title: 'How to build a 70% win rate on Slipr in 90 days',
    excerpt: 'Consistency beats lucky streaks every time. Here\'s the methodology top earners use to maintain win rates above 65% — starting from your very first slip.',
    readTime: '6 min',
    date: 'Apr 20, 2024',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #00C2A8 0%, #009980 100%)',
    tagBg: colors.accentLight,
    tagColor: colors.accent,
    tagBorder: colors.accentMid,
  },
  {
    id: 2,
    category: 'Platform',
    title: 'How Slipr\'s escrow system actually works under the hood',
    excerpt: 'A transparent look at the technology and process that keeps every naira safe — from the moment you pay to the second results are confirmed.',
    readTime: '4 min',
    date: 'Apr 15, 2024',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
    tagBg: colors.surface,
    tagColor: colors.text.secondary,
    tagBorder: colors.border,
  },
  {
    id: 3,
    category: 'Earnings',
    title: 'From ₦12,000 to ₦240,000/month: KingPunter\'s full story',
    excerpt: 'What started as a hobby became a primary income stream. KingPunter shares the exact approach that took him from rookie tipster to verified earner.',
    readTime: '8 min',
    date: 'Apr 10, 2024',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #F5A623 0%, #E67E22 100%)',
    tagBg: 'rgba(245,166,35,0.10)',
    tagColor: '#F5A623',
    tagBorder: 'rgba(245,166,35,0.22)',
  },
  {
    id: 4,
    category: 'For Buyers',
    title: '5 red flags to look for before buying a betting slip',
    excerpt: 'Not every tipster is worth your ₦1,100. Learn the profile signals that separate genuine analysts from lucky guessers — before you spend a naira.',
    readTime: '5 min',
    date: 'Apr 6, 2024',
    icon: '🚩',
    gradient: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
    tagBg: 'rgba(231,76,60,0.08)',
    tagColor: colors.loss,
    tagBorder: 'rgba(231,76,60,0.18)',
  },
  {
    id: 5,
    category: 'Strategy',
    title: 'Why posting fewer slips often means earning more on Slipr',
    excerpt: 'The most profitable tipsters post 2-3 slips a day, not 20. Understand the reputation math behind quality over quantity and why selective posting compounds.',
    readTime: '4 min',
    date: 'Mar 28, 2024',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
    tagBg: 'rgba(155,89,182,0.10)',
    tagColor: '#9B59B6',
    tagBorder: 'rgba(155,89,182,0.22)',
  },
  {
    id: 6,
    category: 'Trust',
    title: 'What the Verified badge actually means — and what it doesn\'t',
    excerpt: 'The gold badge isn\'t a guarantee of wins. It\'s a proof of process. Here\'s an honest breakdown of what Verified tells you and what you still need to verify yourself.',
    readTime: '3 min',
    date: 'Mar 22, 2024',
    icon: '⭐',
    gradient: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    tagBg: colors.accentLight,
    tagColor: colors.accent,
    tagBorder: colors.accentMid,
  },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function BlogGrid() {
  return (
    <Section>
      <Grid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {blogPosts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <BlogCard post={post} />
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
}
