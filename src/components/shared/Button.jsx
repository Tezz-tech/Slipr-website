/**
 * Button — Reusable CTA button.
 * Variants: primary (teal filled), secondary (outlined), ghost (text only).
 * Framer Motion whileTap scale + whileHover lift micro-interaction.
 */
import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, fonts, radii, transitions } from '../../theme';

const variants = {
  primary: css`
    background: ${colors.accent};
    color: ${colors.text.inverse};
    border: 2px solid transparent;
    &:hover { background: #00d4b8; box-shadow: 0 8px 28px rgba(0,194,168,0.35); }
  `,
  secondary: css`
    background: transparent;
    color: ${colors.accent};
    border: 2px solid ${colors.accent};
    &:hover { background: ${colors.accentLight}; }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.text.secondary};
    border: 2px solid ${colors.border};
    &:hover { border-color: ${colors.accent}; color: ${colors.accent}; }
  `,
  dark: css`
    background: ${colors.surfaceElevated};
    color: ${colors.text.primary};
    border: 2px solid ${colors.border};
    &:hover { background: ${colors.surface}; border-color: ${colors.accent}; box-shadow: 0 8px 28px rgba(0,194,168,0.15); }
  `,
};

const sizes = {
  sm: css`padding: 8px 18px; font-size: 13px;`,
  md: css`padding: 12px 26px; font-size: 15px;`,
  lg: css`padding: 15px 34px; font-size: 16px;`,
  xl: css`padding: 18px 44px; font-size: 17px;`,
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${fonts.primary};
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: ${radii.pill};
  cursor: pointer;
  transition: background ${transitions.fast}, box-shadow ${transitions.fast}, border-color ${transitions.fast}, color ${transitions.fast};
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  &:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  as: asElement,
  href,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
      as={asElement}
      href={href}
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      whileTap={{ scale: 0.97, y: 0 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
