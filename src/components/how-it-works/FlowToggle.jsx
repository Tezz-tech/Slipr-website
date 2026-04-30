/**
 * FlowToggle — Pill toggle switch between "Tipster" and "Buyer" journey.
 * Animated background slider on the active state using layoutId.
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, radii, transitions } from '../../theme';

const ToggleWrapper = styled.div`
  display: inline-flex;
  background: ${colors.surface};
  border-radius: ${radii.pill};
  padding: 4px;
  gap: 0;
  border: 1px solid ${colors.border};
  margin: 0 auto 64px;
  position: relative;
`;

const ToggleBtn = styled.button`
  position: relative;
  z-index: 1;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background: none;
  border-radius: ${radii.pill};
  cursor: pointer;
  color: ${({ $active }) => $active ? '#fff' : colors.text.secondary};
  transition: color ${transitions.base};
  letter-spacing: -0.01em;
`;

const ActivePill = styled(motion.div)`
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: ${radii.pill};
  background: ${colors.accent};
  z-index: 0;
`;

export default function FlowToggle({ active, onChange }) {
  const options = ['tipster', 'buyer'];

  return (
    <ToggleWrapper>
      {options.map((opt) => (
        <ToggleBtn
          key={opt}
          $active={active === opt}
          onClick={() => onChange(opt)}
          aria-pressed={active === opt}
        >
          {active === opt && (
            <ActivePill layoutId="togglePill" transition={{ type: 'spring', stiffness: 380, damping: 38 }} />
          )}
          {opt === 'tipster' ? 'I\'m a Tipster' : 'I\'m a Buyer'}
        </ToggleBtn>
      ))}
    </ToggleWrapper>
  );
}
