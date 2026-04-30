/**
 * ContactForm — Split layout contact section.
 * Left: brand message + social links. Right: form with animated submit + success state.
 * Framer Motion loading + success checkmark animation.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';

const Section = styled.section`
  padding: 0 80px 96px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.lg}) { padding: 0 40px 80px; }
  @media (max-width: ${breakpoints.md}) { padding: 0 20px 72px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 60px;
  align-items: start;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftSide = styled.div``;

const LeftTitle = styled.h2`
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
  color: ${colors.text.primary};
  margin-bottom: 16px;

  em { color: ${colors.accent}; font-style: normal; }
`;

const LeftSub = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${colors.text.secondary};
  margin-bottom: 36px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 36px;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${colors.text.secondary};
  transition: color 0.2s;

  &:hover { color: ${colors.accent}; }
`;

const ContactIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${colors.accentLight};
  border: 1px solid ${colors.accentMid};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialBtn = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1.5px solid ${colors.border};
  background: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${colors.text.secondary};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
    background: ${colors.accentLight};
  }
`;

const FormCard = styled.div`
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: 24px;
  padding: 36px;
  box-shadow: ${shadows.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: ${breakpoints.sm}) { grid-template-columns: 1fr; }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: ${radii.md};
  border: 1.5px solid ${colors.border};
  background: ${colors.background};
  font-size: 14px;
  color: ${colors.text.primary};
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 3px ${colors.accentLight};
  }

  &::placeholder { color: ${colors.text.muted}; }
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: ${radii.md};
  border: 1.5px solid ${colors.border};
  background: ${colors.background};
  font-size: 14px;
  color: ${colors.text.primary};
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A8E' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 3px ${colors.accentLight};
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: ${radii.md};
  border: 1.5px solid ${colors.border};
  background: ${colors.background};
  font-size: 14px;
  color: ${colors.text.primary};
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 3px ${colors.accentLight};
  }

  &::placeholder { color: ${colors.text.muted}; }
`;

const SubmitBtn = styled(motion.button)`
  padding: 14px 28px;
  border-radius: ${radii.pill};
  background: ${colors.accent};
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;

  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const SuccessState = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
`;

const CheckCircle = styled(motion.div)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${colors.winLight};
  border: 2px solid rgba(46,204,113,0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
`;

const SuccessTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 8px;
`;

const SuccessSub = styled.p`
  font-size: 14px;
  color: ${colors.text.secondary};
  line-height: 1.6;
`;

const Spinner = styled(motion.div)`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
`;

export default function ContactForm() {
  const [formState, setFormState] = useState('idle'); // idle | loading | success
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1800);
  };

  return (
    <Section>
      <Grid>
        <LeftSide>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          >
            <LeftTitle>We read every message. <em>Really.</em></LeftTitle>
            <LeftSub>
              Whether you have a question, a bug report, a partnership idea, or just want to say what you think — send it. We're a small team and we actually reply.
            </LeftSub>
            <ContactInfo>
              <ContactItem href="mailto:hello@slipr.ng">
                <ContactIconBox>📧</ContactIconBox>
                hello@slipr.ng
              </ContactItem>
              <ContactItem href="mailto:trust@slipr.ng">
                <ContactIconBox>🛡️</ContactIconBox>
                trust@slipr.ng — Trust & Safety
              </ContactItem>
              <ContactItem href="mailto:press@slipr.ng">
                <ContactIconBox>📰</ContactIconBox>
                press@slipr.ng — Media enquiries
              </ContactItem>
            </ContactInfo>
            <SocialRow>
              <SocialBtn href="#" aria-label="Twitter">𝕏</SocialBtn>
              <SocialBtn href="#" aria-label="Instagram">📸</SocialBtn>
              <SocialBtn href="#" aria-label="TikTok">🎵</SocialBtn>
            </SocialRow>
          </motion.div>
        </LeftSide>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <FormCard>
            <AnimatePresence mode="wait">
              {formState !== 'success' ? (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  <Form onSubmit={handleSubmit}>
                    <FormRow>
                      <FieldWrapper>
                        <Label htmlFor="name">Full name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Emeka Okafor"
                          value={values.name}
                          onChange={handleChange}
                          required
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="emeka@example.com"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </FieldWrapper>
                    </FormRow>

                    <FieldWrapper>
                      <Label htmlFor="subject">Subject</Label>
                      <Select id="subject" name="subject" value={values.subject} onChange={handleChange} required>
                        <option value="">Select a topic</option>
                        <option value="general">General question</option>
                        <option value="account">Account issue</option>
                        <option value="payment">Payment / withdrawal</option>
                        <option value="dispute">Dispute or complaint</option>
                        <option value="partnership">Partnership / media</option>
                        <option value="bug">Bug report</option>
                        <option value="other">Other</option>
                      </Select>
                    </FieldWrapper>

                    <FieldWrapper>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us what's on your mind..."
                        value={values.message}
                        onChange={handleChange}
                        required
                      />
                    </FieldWrapper>

                    <SubmitBtn
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formState === 'loading' ? (
                        <>
                          <Spinner animate={{ rotate: 360 }} transition={{ duration: 0.7, ease: 'linear', repeat: Infinity }} />
                          Sending...
                        </>
                      ) : 'Send message →'}
                    </SubmitBtn>
                  </Form>
                </motion.div>
              ) : (
                <SuccessState
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <CheckCircle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  >
                    ✓
                  </CheckCircle>
                  <SuccessTitle>Message sent!</SuccessTitle>
                  <SuccessSub>We usually reply within a few hours. Check your inbox — and maybe the spam folder just in case.</SuccessSub>
                </SuccessState>
              )}
            </AnimatePresence>
          </FormCard>
        </motion.div>
      </Grid>
    </Section>
  );
}
