/**
 * TermsOfService — Full terms content with section anchors for sidebar ToC.
 */
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

const Prose = styled.div`
  font-size: 15px;
  line-height: 1.85;
  color: ${colors.text.secondary};

  h2 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: ${colors.text.primary};
    margin: 36px 0 12px;
    padding-top: 12px;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.text.primary};
    margin: 24px 0 10px;
  }

  p { margin-bottom: 16px; }

  ul {
    padding-left: 24px;
    margin-bottom: 16px;
    li { margin-bottom: 8px; }
  }

  strong { color: ${colors.text.primary}; font-weight: 600; }

  a { color: ${colors.accent}; }
`;

export const tocSections = [
  { id: 'tos-acceptance', label: 'Acceptance of Terms' },
  { id: 'tos-services', label: 'Description of Services' },
  { id: 'tos-accounts', label: 'User Accounts' },
  { id: 'tos-escrow', label: 'Escrow & Payments' },
  { id: 'tos-tipsters', label: 'Tipster Obligations' },
  { id: 'tos-buyers', label: 'Buyer Obligations' },
  { id: 'tos-prohibited', label: 'Prohibited Conduct' },
  { id: 'tos-liability', label: 'Limitation of Liability' },
  { id: 'tos-termination', label: 'Termination' },
  { id: 'tos-governing', label: 'Governing Law' },
];

export default function TermsOfService() {
  return (
    <Prose>
      <p><strong>Last updated: April 28, 2024</strong></p>

      <h2 id="tos-acceptance">1. Acceptance of Terms</h2>
      <p>By creating an account on Slipr or using the Slipr mobile application ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you must not use the Platform. These Terms constitute a legally binding agreement between you and Slipr Technologies Ltd ("Slipr", "we", "us", or "our"), a company registered in Nigeria.</p>
      <p>We may update these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised Terms.</p>

      <h2 id="tos-services">2. Description of Services</h2>
      <p>Slipr is a digital marketplace that connects individuals ("Tipsters") who provide sports betting analysis and tip codes with individuals ("Buyers") who wish to access such analysis. Slipr provides:</p>
      <ul>
        <li>A platform for Tipsters to list and sell access to their slip codes</li>
        <li>An escrow system to hold and manage payments between parties</li>
        <li>Result verification and dispute resolution services</li>
        <li>A reputation and review system for platform participants</li>
      </ul>
      <p><strong>Slipr does not operate a betting service, accept bets, or provide gambling advice.</strong> All tips purchased on Slipr are informational and analytical content only.</p>

      <h2 id="tos-accounts">3. User Accounts</h2>
      <p>You must be at least 18 years of age to create an account. By registering, you warrant that all information you provide is accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials.</p>
      <p>You may not create more than one account per person. Multiple accounts created to circumvent bans, game the reputation system, or manipulate escrow will result in permanent termination of all associated accounts.</p>

      <h2 id="tos-escrow">4. Escrow and Payment System</h2>
      <p>When a Buyer unlocks a slip, <strong>₦100</strong> is immediately and irrevocably paid to Slipr as a platform fee. The remaining <strong>₦1,000</strong> (or configured escrow amount) is held by Slipr in escrow on behalf of the transaction parties.</p>
      <p>Escrow release conditions:</p>
      <ul>
        <li><strong>Win:</strong> Tipster uploads result screenshot within 4 hours of event conclusion. Upon verification, escrow is released to the Tipster.</li>
        <li><strong>Loss:</strong> Upon confirmed loss result, escrow is automatically refunded to the Buyer's wallet.</li>
        <li><strong>No result submitted:</strong> If a Tipster fails to submit a result within 4 hours, the escrow defaults to a Buyer refund.</li>
        <li><strong>Dispute:</strong> Escrow is held pending Slipr's review, which will be completed within 24 hours.</li>
      </ul>

      <h2 id="tos-tipsters">5. Tipster Obligations</h2>
      <p>As a Tipster, you agree to:</p>
      <ul>
        <li>Post only legitimate, original slip codes that you have personally selected</li>
        <li>Submit accurate result screenshots within 4 hours of event conclusion</li>
        <li>Not manipulate, alter, or fabricate result screenshots in any form</li>
        <li>Not share slip codes outside the Platform after receiving buyer payments</li>
        <li>Accept that your win/loss record is permanently public and cannot be altered</li>
      </ul>
      <p>Violation of these obligations may result in immediate account termination and forfeiture of pending wallet balances pending investigation.</p>

      <h2 id="tos-buyers">6. Buyer Obligations</h2>
      <p>As a Buyer, you agree to:</p>
      <ul>
        <li>Purchase slips for personal, informational use only — not for resale or redistribution</li>
        <li>Not share purchased slip codes with others</li>
        <li>Accept that the ₦100 platform fee is non-refundable in all circumstances</li>
        <li>Not raise false disputes or abuse the dispute resolution process</li>
        <li>Use the information provided on Slipr at your own risk — past win rates do not guarantee future performance</li>
      </ul>

      <h2 id="tos-prohibited">7. Prohibited Conduct</h2>
      <p>You must not:</p>
      <ul>
        <li>Create fake accounts, use bots, or automate interactions with the Platform</li>
        <li>Engage in any form of collusion between Tipsters and Buyers to manipulate the escrow system</li>
        <li>Upload content that infringes intellectual property rights</li>
        <li>Harass, threaten, or abuse other Platform users</li>
        <li>Attempt to circumvent or attack the Platform's security systems</li>
        <li>Use the Platform for any unlawful purpose under Nigerian or international law</li>
      </ul>

      <h2 id="tos-liability">8. Limitation of Liability</h2>
      <p>Slipr's liability to you for any claim arising from these Terms or Platform use is limited to the total fees paid by you to Slipr in the 30 days preceding the claim. Slipr is not liable for any indirect, consequential, or incidental damages, including betting losses resulting from the use of purchased tips.</p>
      <p><strong>Slipr does not guarantee the accuracy, profitability, or quality of any tip listed on the Platform.</strong> You acknowledge that sports betting involves risk and that tip performance is subject to inherent uncertainty.</p>

      <h2 id="tos-termination">9. Termination</h2>
      <p>Slipr may terminate or suspend your account at any time, with or without notice, for violation of these Terms or for any other reason at Slipr's sole discretion. Upon termination, your right to use the Platform ceases immediately. Legitimate wallet balances above the withdrawal fee threshold will be processed for withdrawal.</p>

      <h2 id="tos-governing">10. Governing Law</h2>
      <p>These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.</p>
      <p>For any legal queries, contact: legal@slipr.ng</p>
    </Prose>
  );
}
