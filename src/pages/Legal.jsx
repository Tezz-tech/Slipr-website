/**
 * Legal — /legal route
 * Tab switcher: Terms of Service / Privacy Policy / Refund Policy.
 * Sidebar ToC on desktop that highlights active section on scroll.
 * AnimatePresence for tab switching.
 */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../theme';
import PageHero from '../components/shared/PageHero';
import SectionBridge from '../components/shared/SectionBridge';
import TermsOfService, { tocSections as tosSections } from '../components/legal/TermsOfService';
import PrivacyPolicy, { tocSections as ppSections } from '../components/legal/PrivacyPolicy';
import RefundPolicy, { tocSections as rpSections } from '../components/legal/RefundPolicy';

const PageWrapper = styled.div`
  padding: 0 80px 96px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.lg}) { padding: 0 40px 80px; }
  @media (max-width: ${breakpoints.md}) { padding: 0 20px 72px; }
`;

const TabsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const TabBtn = styled.button`
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${radii.pill};
  border: 1.5px solid ${({ $active }) => $active ? colors.accent : colors.border};
  background: ${({ $active }) => $active ? colors.accentLight : 'transparent'};
  color: ${({ $active }) => $active ? colors.accent : colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: -0.01em;
  font-family: inherit;

  &:hover { border-color: ${colors.accent}; color: ${colors.accent}; }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ${breakpoints.lg}) { grid-template-columns: 1fr; }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 100px;

  @media (max-width: ${breakpoints.lg}) { display: none; }
`;

const SidebarTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.text.muted};
  margin-bottom: 14px;
`;

const SidebarLink = styled.a`
  display: block;
  font-size: 13px;
  padding: 7px 12px;
  border-radius: 8px;
  border-left: 2px solid ${({ $active }) => $active ? colors.accent : 'transparent'};
  color: ${({ $active }) => $active ? colors.accent : colors.text.secondary};
  background: ${({ $active }) => $active ? colors.accentLight : 'transparent'};
  font-weight: ${({ $active }) => $active ? 600 : 400};
  cursor: pointer;
  transition: all 0.18s;
  margin-bottom: 4px;

  &:hover { color: ${colors.accent}; background: ${colors.accentLight}; }
`;

const ContentPane = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 48px;
  box-shadow: ${shadows.sm};

  @media (max-width: ${breakpoints.md}) { padding: 28px 20px; }
`;

const docConfigs = {
  tos: { label: 'Terms of Service', Component: TermsOfService, sections: tosSections },
  privacy: { label: 'Privacy Policy', Component: PrivacyPolicy, sections: ppSections },
  refund: { label: 'Refund Policy', Component: RefundPolicy, sections: rpSections },
};

export default function Legal() {
  const [activeTab, setActiveTab] = useState('tos');
  const [activeSection, setActiveSection] = useState(null);
  const contentRef = useRef(null);

  const config = docConfigs[activeTab];

  // Intersection observer for sidebar highlight
  useEffect(() => {
    const ids = config.sections.map((s) => s.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [activeTab, config.sections]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Our commitments to you, <em>in plain language</em>"
        subtitle="We've written these documents to actually be read. No legalese labyrinth."
      />
      <PageWrapper>
        <TabsRow>
          {Object.entries(docConfigs).map(([key, { label }]) => (
            <TabBtn key={key} $active={activeTab === key} onClick={() => handleTabChange(key)}>
              {label}
            </TabBtn>
          ))}
        </TabsRow>

        <ContentLayout>
          <Sidebar>
            <SidebarTitle>On this page</SidebarTitle>
            {config.sections.map((s) => (
              <SidebarLink
                key={s.id}
                $active={activeSection === s.id}
                onClick={() => {
                  const el = document.getElementById(s.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {s.label}
              </SidebarLink>
            ))}
          </Sidebar>

          <AnimatePresence mode="wait">
            <ContentPane
              key={activeTab}
              ref={contentRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <config.Component />
            </ContentPane>
          </AnimatePresence>
        </ContentLayout>
      </PageWrapper>

      <SectionBridge
        variant="wave"
        label="HAVE QUESTIONS?"
        title="We keep things <em>transparent</em>"
        subtitle="Our policies exist to protect you. If anything is unclear, our FAQ has plain-language answers."
        cta="Visit the FAQ"
        to="/faq"
        achievement={{ icon: '📋', text: 'Policy Reviewed' }}
        xp={50}
      />
    </main>
  );
}
