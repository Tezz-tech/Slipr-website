/**
 * Navbar — Fixed top navigation.
 * Transparent on hero, frosted glass blur(16px) past 80px scroll (useScroll).
 * Active route indicator, mobile hamburger with AnimatePresence slide-down menu.
 * Closes on route change.
 */
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { colors, fonts, radii, transitions, zIndex, breakpoints } from '../../theme';
import Button from './Button';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.navbar};
  padding: 0 40px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background ${transitions.slow}, border-color ${transitions.slow}, box-shadow ${transitions.slow};

  background: ${({ $scrolled }) => $scrolled
    ? 'rgba(248, 249, 250, 0.82)'
    : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(16px) saturate(180%)' : 'none'};
  -webkit-backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(16px) saturate(180%)' : 'none'};
  border-bottom: 1px solid ${({ $scrolled }) => $scrolled
    ? 'rgba(0,0,0,0.06)'
    : 'transparent'};
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none'};

  @media (max-width: ${breakpoints.lg}) {
    padding: 0 24px;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 0 20px;
  }
`;

const Logo = styled(Link)`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: ${colors.accent};
  flex-shrink: 0;
`;

const CenterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text.secondary};
  padding: 7px 14px;
  border-radius: ${radii.md};
  transition: color ${transitions.fast}, background ${transitions.fast};
  letter-spacing: -0.01em;

  &:hover {
    color: ${colors.text.primary};
    background: rgba(0,0,0,0.04);
  }

  &.active {
    color: ${colors.accent};
    font-weight: 600;
  }

  /* Teal underline indicator on active */
  &.active::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${colors.accent};
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${breakpoints.lg}) {
    .blog-link { display: none; }
  }

  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const BlogLink = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text.secondary};
  padding: 7px 14px;
  border-radius: ${radii.md};
  transition: color ${transitions.fast};
  letter-spacing: -0.01em;
  &:hover { color: ${colors.text.primary}; }
  &.active { color: ${colors.accent}; }
`;

const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: ${radii.sm};
  z-index: ${zIndex.navbar + 1};

  @media (max-width: ${breakpoints.md}) {
    display: flex;
  }
`;

const HamburgerLine = styled(motion.span)`
  display: block;
  width: 22px;
  height: 2px;
  background: ${colors.text.primary};
  border-radius: 2px;
  transform-origin: center;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  background: rgba(248, 249, 250, 0.96);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 20px 20px 28px;
  z-index: ${zIndex.navbar - 1};
  box-shadow: 0 16px 40px rgba(0,0,0,0.10);
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MobileNavItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.text.secondary};
  padding: 13px 16px;
  border-radius: ${radii.md};
  transition: color ${transitions.fast}, background ${transitions.fast};
  &.active { color: ${colors.accent}; background: ${colors.accentLight}; font-weight: 600; }
  &:hover { color: ${colors.text.primary}; background: rgba(0,0,0,0.04); }
`;

const MobileDivider = styled.div`
  height: 1px;
  background: ${colors.border};
  margin: 12px 0;
`;

const navLinks = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/tipsters', label: 'For Tipsters' },
  { to: '/buyers', label: 'For Buyers' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo to="/">Slipr</Logo>

        <CenterLinks>
          {navLinks.map(({ to, label }) => (
            <NavItem key={to} to={to}>{label}</NavItem>
          ))}
        </CenterLinks>

        <RightSide>
          <BlogLink to="/blog" className="blog-link">Blog</BlogLink>
          <Button as={Link} to="/tipsters" size="sm">
            Get Started
          </Button>
        </RightSide>

        <HamburgerBtn
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <HamburgerLine
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <HamburgerLine
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <HamburgerLine
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </HamburgerBtn>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <MobileLinks>
              {navLinks.map(({ to, label }) => (
                <MobileNavItem key={to} to={to}>{label}</MobileNavItem>
              ))}
              <MobileNavItem to="/blog">Blog</MobileNavItem>
              <MobileNavItem to="/faq">FAQ</MobileNavItem>
              <MobileNavItem to="/contact">Contact</MobileNavItem>
            </MobileLinks>
            <MobileDivider />
            <Button as={Link} to="/tipsters" fullWidth size="lg">
              Get Started Free
            </Button>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
