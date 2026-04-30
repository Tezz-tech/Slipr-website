/**
 * GlassCard — Reusable glassmorphism surface.
 * Hover: lifts 6px, teal shadow bloom.
 * Framer Motion whileHover animation.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, glass, shadows, transitions } from '../../theme';

const Card = styled(motion.div)`
  background: ${({ $variant }) =>
    $variant === 'teal' ? glass.teal.background :
    $variant === 'dark' ? glass.dark.background :
    glass.light.background};
  backdrop-filter: ${glass.light.backdropFilter};
  -webkit-backdrop-filter: ${glass.light.backdropFilter};
  border: ${({ $variant }) =>
    $variant === 'teal' ? glass.teal.border :
    $variant === 'dark' ? glass.dark.border :
    glass.light.border};
  border-radius: ${({ $radius }) => $radius || radii.lg};
  padding: ${({ $padding }) => $padding || '28px'};
  position: relative;
  overflow: hidden;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  box-shadow: ${shadows.sm};
  transition: box-shadow ${transitions.base};

  /* Subtle inner highlight at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
    pointer-events: none;
  }
`;

export default function GlassCard({
  children,
  variant = 'light',
  radius,
  padding,
  clickable = false,
  animate = true,
  className,
  style,
  onClick,
}) {
  const hoverProps = animate && clickable ? {
    whileHover: {
      y: -6,
      boxShadow: shadows.cardHover,
      transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
    },
    whileTap: { scale: 0.99 },
  } : animate ? {
    whileHover: {
      y: -4,
      boxShadow: shadows.cardHover,
      transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
    },
  } : {};

  return (
    <Card
      $variant={variant}
      $radius={radius}
      $padding={padding}
      $clickable={clickable}
      className={className}
      style={style}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Card>
  );
}
