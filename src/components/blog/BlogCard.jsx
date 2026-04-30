/**
 * BlogCard — Individual blog post card.
 * Category tag, title, excerpt, read time, date.
 * Hover: lift + shadow bloom.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, shadows } from '../../theme';

const Card = styled(motion.article)`
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${shadows.sm};
  cursor: pointer;
  transition: box-shadow 0.25s;
`;

const CardImage = styled.div`
  height: 180px;
  background: ${({ $bg }) => $bg};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
`;

const ImageIcon = styled.div`
  font-size: 48px;
  position: relative;
  z-index: 1;
`;

const CardBody = styled.div`
  padding: 22px;
`;

const CategoryTag = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: ${radii.pill};
  background: ${({ $bg }) => $bg || colors.accentLight};
  color: ${({ $color }) => $color || colors.accent};
  border: 1px solid ${({ $border }) => $border || colors.accentMid};
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${colors.text.primary};
  line-height: 1.4;
  margin-bottom: 10px;
`;

const CardExcerpt = styled.p`
  font-size: 13px;
  line-height: 1.65;
  color: ${colors.text.secondary};
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.text.muted};
`;

export default function BlogCard({ post }) {
  return (
    <Card
      whileHover={{ y: -6, boxShadow: shadows.cardHover, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
    >
      <CardImage $bg={post.gradient}>
        <ImagePattern />
        <ImageIcon>{post.icon}</ImageIcon>
      </CardImage>
      <CardBody>
        <CategoryTag $bg={post.tagBg} $color={post.tagColor} $border={post.tagBorder}>
          {post.category}
        </CategoryTag>
        <CardTitle>{post.title}</CardTitle>
        <CardExcerpt>{post.excerpt}</CardExcerpt>
        <CardFooter>
          <span>{post.readTime} read</span>
          <span>{post.date}</span>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
