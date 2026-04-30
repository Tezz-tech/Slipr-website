/**
 * PrivacyPolicy — Privacy policy content with section anchors.
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
`;

export const tocSections = [
  { id: 'pp-collected', label: 'Data We Collect' },
  { id: 'pp-use', label: 'How We Use It' },
  { id: 'pp-sharing', label: 'Data Sharing' },
  { id: 'pp-retention', label: 'Data Retention' },
  { id: 'pp-security', label: 'Security' },
  { id: 'pp-rights', label: 'Your Rights' },
  { id: 'pp-contact', label: 'Contact Us' },
];

export default function PrivacyPolicy() {
  return (
    <Prose>
      <p><strong>Last updated: April 28, 2024</strong></p>
      <p>Slipr Technologies Ltd ("Slipr") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights as a user.</p>

      <h2 id="pp-collected">1. Data We Collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li><strong>Account data:</strong> Phone number, display name, profile photo (optional), account type (Tipster/Buyer)</li>
        <li><strong>Transaction data:</strong> Payment records, wallet balances, escrow history, slip purchase and sale records</li>
        <li><strong>Usage data:</strong> App interactions, pages viewed, feature usage, session timestamps</li>
        <li><strong>Device data:</strong> Device model, OS version, app version, IP address, push notification token</li>
        <li><strong>Content data:</strong> Slip codes you post, result screenshots you upload, reviews you submit</li>
        <li><strong>Bank data:</strong> Bank account details for withdrawal (stored securely; card numbers never stored by Slipr)</li>
      </ul>

      <h2 id="pp-use">2. How We Use Your Data</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Operate, maintain, and improve the Slipr Platform</li>
        <li>Process payments, manage escrow, and settle transactions</li>
        <li>Verify result screenshots and resolve disputes</li>
        <li>Send transactional notifications (purchase confirmations, refund alerts, settlement notices)</li>
        <li>Detect and prevent fraud, abuse, and platform manipulation</li>
        <li>Comply with legal and regulatory obligations</li>
        <li>Provide customer support</li>
      </ul>
      <p>We do not use your data for advertising to third parties. We do not sell your personal data.</p>

      <h2 id="pp-sharing">3. Data Sharing</h2>
      <p>We share your data only with:</p>
      <ul>
        <li><strong>Paystack:</strong> Our payment processor, for handling card payments and bank transfers. Paystack is PCI-DSS compliant.</li>
        <li><strong>Cloud infrastructure providers:</strong> AWS services used for data storage and processing, under strict data processing agreements.</li>
        <li><strong>Legal authorities:</strong> When required by law, court order, or to protect platform integrity and user safety.</li>
      </ul>
      <p>We do not share your personal data with other users beyond what is necessary for the Platform to function (e.g., your display name and win rate are visible on your public tipster profile).</p>

      <h2 id="pp-retention">4. Data Retention</h2>
      <p>We retain your personal data for as long as your account is active, plus 5 years after account closure for financial record-keeping purposes required under Nigerian law. Transaction records are retained for 7 years.</p>
      <p>You may request deletion of your account and non-financial data at any time by contacting privacy@slipr.ng. Financial records cannot be deleted before the retention period ends.</p>

      <h2 id="pp-security">5. Security</h2>
      <p>We implement industry-standard security measures including:</p>
      <ul>
        <li>TLS 1.3 encryption for all data in transit</li>
        <li>AES-256 encryption for sensitive data at rest</li>
        <li>Multi-factor authentication for internal admin access</li>
        <li>Regular third-party security audits</li>
        <li>Automated anomaly detection for suspicious transaction patterns</li>
      </ul>
      <p>No system is perfectly secure. In the event of a data breach affecting your information, we will notify you within 72 hours of becoming aware of it.</p>

      <h2 id="pp-rights">6. Your Rights</h2>
      <p>Under Nigerian data protection law (NDPA 2023), you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of data we are not legally required to retain</li>
        <li>Object to certain processing activities</li>
        <li>Data portability — receive your data in a common machine-readable format</li>
        <li>Withdraw consent for non-essential processing</li>
      </ul>
      <p>To exercise these rights, email privacy@slipr.ng with "Data Rights Request" in the subject line.</p>

      <h2 id="pp-contact">7. Contact Us</h2>
      <p>For privacy-related queries: privacy@slipr.ng</p>
      <p>Data Protection Officer: Slipr Technologies Ltd, Lagos, Nigeria</p>
    </Prose>
  );
}
