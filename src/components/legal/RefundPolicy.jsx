/**
 * RefundPolicy (Legal) — Full refund policy content.
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

  p { margin-bottom: 16px; }
  ul { padding-left: 24px; margin-bottom: 16px; li { margin-bottom: 8px; } }
  strong { color: ${colors.text.primary}; font-weight: 600; }
  a { color: ${colors.accent}; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
    font-size: 14px;
  }

  th {
    text-align: left;
    padding: 10px 14px;
    background: ${colors.surface};
    color: ${colors.text.primary};
    font-weight: 600;
    border-bottom: 2px solid ${colors.border};
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid ${colors.border};
    color: ${colors.text.secondary};
  }

  tr:last-child td { border-bottom: none; }
`;

export const tocSections = [
  { id: 'rp-overview', label: 'Overview' },
  { id: 'rp-platform-fee', label: 'Platform Fee' },
  { id: 'rp-escrow', label: 'Escrow Refunds' },
  { id: 'rp-scenarios', label: 'Refund Scenarios' },
  { id: 'rp-timeline', label: 'Refund Timeline' },
  { id: 'rp-disputes', label: 'Disputed Refunds' },
  { id: 'rp-contact', label: 'Contact' },
];

export default function RefundPolicy() {
  return (
    <Prose>
      <p><strong>Last updated: April 28, 2024</strong></p>

      <h2 id="rp-overview">1. Overview</h2>
      <p>Slipr operates an escrow-based payment system designed to protect both Buyers and Tipsters. This Refund Policy explains exactly when refunds are issued, how they are processed, and what happens in edge cases. We have designed this policy to be fair to all parties.</p>

      <h2 id="rp-platform-fee">2. Platform Fee (₦100) — Non-Refundable</h2>
      <p>The ₦100 platform fee collected at the time of slip unlock is <strong>non-refundable under all circumstances</strong>. This fee is Slipr's revenue for providing the marketplace infrastructure, escrow management, and support services. It is deducted immediately and irrevocably upon purchase completion.</p>

      <h2 id="rp-escrow">3. Escrow Amount — Refund Conditions</h2>
      <p>The ₦1,000 (or configured escrow amount) is refunded to the Buyer's in-app wallet under the following conditions:</p>
      <ul>
        <li>The slip event result in a loss</li>
        <li>The event is postponed, cancelled, or abandoned without a result</li>
        <li>The Tipster submits an invalid or incorrect slip code (verified by Slipr)</li>
        <li>The event result cannot be verified via live sports data within 4 hours of event conclusion</li>
        <li>Slipr's dispute resolution team rules in the Buyer's favour</li>
      </ul>

      <h2 id="rp-scenarios">4. Detailed Refund Scenarios</h2>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Platform Fee (₦100)</th><th>Escrow (₦1,000)</th></tr>
        </thead>
        <tbody>
          <tr><td>Slip loses</td><td>Non-refundable</td><td>Refunded to Buyer wallet</td></tr>
          <tr><td>Slip wins</td><td>Non-refundable</td><td>₦900 released to Tipster; ₦100 Slipr commission</td></tr>
          <tr><td>Event cancelled/postponed</td><td>Non-refundable</td><td>Refunded to Buyer wallet</td></tr>
          <tr><td>Invalid slip code (tipster error)</td><td>Refunded</td><td>Refunded to Buyer wallet</td></tr>
          <tr><td>Buyer changes mind after unlock</td><td>Non-refundable</td><td>Non-refundable (code revealed)</td></tr>
          <tr><td>Result under dispute — Buyer wins</td><td>Non-refundable</td><td>Refunded to Buyer wallet</td></tr>
          <tr><td>Result under dispute — Tipster wins</td><td>Non-refundable</td><td>Released to Tipster wallet</td></tr>
          <tr><td>Result unverifiable via live data</td><td>Non-refundable</td><td>Refunded to Buyer wallet</td></tr>
        </tbody>
      </table>

      <h2 id="rp-timeline">5. Refund Processing Timeline</h2>
      <ul>
        <li><strong>Automatic refunds (loss/cancellation):</strong> Credited to Buyer wallet within 15 minutes of verification</li>
        <li><strong>Disputed results:</strong> Resolved and processed within 24 hours of dispute being raised</li>
        <li><strong>Invalid code refunds:</strong> Processed within 4 business hours of a verified complaint</li>
        <li><strong>Wallet to bank transfer:</strong> Instant, subject to bank processing (typically under 30 minutes)</li>
      </ul>
      <p>Refunds are credited to your in-app Slipr wallet, not directly to your original payment method. You can withdraw wallet funds to your registered bank account at any time.</p>

      <h2 id="rp-disputes">6. Disputing a Refund Decision</h2>
      <p>If you believe a refund decision was made in error, you may escalate within <strong>48 hours</strong> of the decision by emailing trust@slipr.ng with your transaction ID and supporting evidence. Escalated disputes are reviewed by a senior Slipr team member within 24 hours. Our decision on escalated disputes is final.</p>

      <h2 id="rp-contact">7. Contact</h2>
      <p>Refund queries: trust@slipr.ng</p>
      <p>Include your transaction ID for fastest resolution.</p>
    </Prose>
  );
}
