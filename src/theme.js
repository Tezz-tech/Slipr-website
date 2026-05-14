export const colors = {
  bg: '#06060E',
  background: '#06060E',
  bgAlt: '#0C0C1A',
  surface: '#11111E',
  surfaceElevated: '#191928',
  text: {
    primary: '#F0F0F8',
    secondary: '#8A8AA8',
    inverse: '#06060E',
    muted: '#4A4A68',
  },
  accent: '#00C2A8',
  accentLight: 'rgba(0, 194, 168, 0.10)',
  accentMid: 'rgba(0, 194, 168, 0.22)',
  accentBright: '#00E8C8',
  win: '#2ECC71',
  winLight: 'rgba(46, 204, 113, 0.12)',
  loss: '#E74C3C',
  lossLight: 'rgba(231, 76, 60, 0.12)',
  verified: '#F5A623',
  verifiedLight: 'rgba(245, 166, 35, 0.12)',
  border: 'rgba(255, 255, 255, 0.07)',
  borderBright: 'rgba(255, 255, 255, 0.14)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  gold: '#FFD700',
  goldLight: 'rgba(255, 215, 0, 0.12)',
};

export const fonts = {
  primary: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  xxl: '64px',
  section: '96px',
};

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '28px',
  pill: '999px',
  circle: '50%',
};

export const shadows = {
  xs: '0 1px 3px rgba(0,0,0,0.3)',
  sm: '0 2px 8px rgba(0,0,0,0.4)',
  md: '0 4px 20px rgba(0,0,0,0.5)',
  lg: '0 8px 40px rgba(0,0,0,0.6)',
  xl: '0 20px 60px rgba(0,0,0,0.7)',
  glow: '0 0 40px rgba(0,194,168,0.25)',
  glowMd: '0 8px 32px rgba(0,194,168,0.20)',
  cardHover: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,194,168,0.12)',
  winGlow: '0 0 30px rgba(46,204,113,0.22)',
};

export const glass = {
  light: {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  dark: {
    background: 'rgba(6, 6, 14, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
  },
  teal: {
    background: 'rgba(0, 194, 168, 0.06)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 194, 168, 0.18)',
  },
};

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1440px',
};

export const transitions = {
  fast: '0.15s cubic-bezier(0.23, 1, 0.32, 1)',
  base: '0.25s cubic-bezier(0.23, 1, 0.32, 1)',
  slow: '0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  spring: { type: 'spring', stiffness: 320, damping: 32 },
  easing: [0.23, 1, 0.32, 1],
};

export const zIndex = {
  base: 1,
  card: 10,
  sticky: 50,
  navbar: 100,
  modal: 200,
  toast: 300,
};

export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  },
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
  staggerSlow: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  },
  cardHover: {
    rest: { y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' },
    hover: { y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,194,168,0.12)', transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } },
  },
};

// Backward compat aliases (used by old light-theme code)
export const background = colors.bg;
