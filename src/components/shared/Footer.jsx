/**
 * Footer — Four-column layout on desktop, stacked on mobile.
 * Logo + tagline + socials / Product links / Company links / Legal links.
 * Bottom bar with copyright and "Built with love in Nigeria".
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, fonts, spacing, breakpoints, radii } from '../../theme';

const FooterWrapper = styled.footer`
  background: ${colors.bgAlt};
  color: ${colors.text.primary};
  padding: 72px 80px 0;

  @media (max-width: ${breakpoints.lg}) { padding: 64px 40px 0; }
  @media (max-width: ${breakpoints.md}) { padding: 56px 20px 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const ColLogo = styled.div``;

const LogoMark = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: ${colors.accent};
  display: inline-block;
  margin-bottom: 12px;
`;

const Tagline = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,0.48);
  max-width: 220px;
  margin-bottom: 24px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: ${radii.md};
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.6);
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${colors.accentLight};
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;

const Col = styled.div``;

const ColTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 18px;
`;

const ColLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColLink = styled.li`
  a {
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    transition: color 0.18s;
    line-height: 1;

    &:hover { color: ${colors.accent}; }
  }
`;

const BottomBar = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.30);
`;

const MadeIn = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.30);
`;

const TwitterSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstaSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const TiktokSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.18 8.18 0 004.82 1.54V7.1a4.86 4.86 0 01-1.05-.41z"/>
  </svg>
);

export default function Footer() {
  return (
    <FooterWrapper>
      <Grid>
        <ColLogo>
          <LogoMark to="/">Slipr</LogoMark>
          <Tagline>Nigeria's premier betting tip marketplace. Post your slip. Get paid when it wins.</Tagline>
          <SocialRow>
            <SocialIcon href="#" aria-label="Twitter / X"><TwitterSVG /></SocialIcon>
            <SocialIcon href="#" aria-label="Instagram"><InstaSVG /></SocialIcon>
            <SocialIcon href="#" aria-label="TikTok"><TiktokSVG /></SocialIcon>
          </SocialRow>
        </ColLogo>

        <Col>
          <ColTitle>Product</ColTitle>
          <ColLinks>
            <ColLink><Link to="/how-it-works">How It Works</Link></ColLink>
            <ColLink><Link to="/tipsters">For Tipsters</Link></ColLink>
            <ColLink><Link to="/buyers">For Buyers</Link></ColLink>
            <ColLink><Link to="/pricing">Pricing</Link></ColLink>
            <ColLink><Link to="/faq">FAQ</Link></ColLink>
          </ColLinks>
        </Col>

        <Col>
          <ColTitle>Company</ColTitle>
          <ColLinks>
            <ColLink><Link to="/about">About Us</Link></ColLink>
            <ColLink><Link to="/blog">Blog</Link></ColLink>
            <ColLink><Link to="/contact">Contact</Link></ColLink>
          </ColLinks>
        </Col>

        <Col>
          <ColTitle>Legal</ColTitle>
          <ColLinks>
            <ColLink><Link to="/legal">Terms of Service</Link></ColLink>
            <ColLink><Link to="/legal">Privacy Policy</Link></ColLink>
            <ColLink><Link to="/legal">Refund Policy</Link></ColLink>
          </ColLinks>
        </Col>
      </Grid>

      <BottomBar>
        <Copyright>© 2024 Slipr Technologies Ltd. All rights reserved.</Copyright>
        <MadeIn>Built with ❤️ in Nigeria</MadeIn>
      </BottomBar>
    </FooterWrapper>
  );
}
