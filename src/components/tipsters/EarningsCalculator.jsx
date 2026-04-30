/**
 * EarningsCalculator — Interactive slider showing daily/weekly/monthly earnings.
 * useSpring on number values for smooth animate-on-change.
 * Two sliders: slips per day + win rate.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { colors, radii, breakpoints, shadows } from '../../theme';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const Section = styled.section`
  padding: 96px 80px;
  background: ${colors.surface};

  @media (max-width: ${breakpoints.lg}) { padding: 80px 40px; }
  @media (max-width: ${breakpoints.md}) { padding: 72px 20px; }
`;

const CalcWrapper = styled.div`
  max-width: 880px;
  margin: 56px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;

  @media (max-width: ${breakpoints.md}) { grid-template-columns: 1fr; }
`;

const ControlPanel = styled(GlassCard)``;

const SliderGroup = styled.div`
  margin-bottom: 32px;
  &:last-child { margin-bottom: 0; }
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const LabelText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const LabelValue = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.accent};
  letter-spacing: -0.03em;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    ${colors.accent} 0%,
    ${colors.accent} ${({ $pct }) => $pct}%,
    ${colors.surface} ${({ $pct }) => $pct}%,
    ${colors.surface} 100%
  );
  outline: none;
  cursor: pointer;
  border: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${colors.accent};
    cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(0,194,168,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 14px rgba(0,194,168,0.45);
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${colors.accent};
    cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(0,194,168,0.35);
  }
`;

const SliderTicks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
`;

const Tick = styled.span`
  font-size: 11px;
  color: ${colors.text.muted};
`;

const ResultPanel = styled(GlassCard)``;

const ResultTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.text.muted};
  margin-bottom: 24px;
`;

const EarningRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

const EarningLabel = styled.span`
  font-size: 14px;
  color: ${colors.text.secondary};
`;

const EarningValue = styled(motion.span)`
  font-size: ${({ $big }) => $big ? '28px' : '20px'};
  font-weight: 800;
  color: ${({ $big }) => $big ? colors.accent : colors.text.primary};
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
`;

const DisclaimerText = styled.p`
  font-size: 12px;
  color: ${colors.text.muted};
  margin-top: 16px;
  line-height: 1.5;
`;

function AnimatedNumber({ value, prefix = '₦' }) {
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return <>{prefix}{display.toLocaleString()}</>;
}

export default function EarningsCalculator() {
  const [slipsPerDay, setSlipsPerDay] = useState(3);
  const [winRate, setWinRate] = useState(65);

  const ESCROW = 1000;

  const dailyEarnings = Math.round(slipsPerDay * (winRate / 100) * ESCROW);
  const weeklyEarnings = dailyEarnings * 7;
  const monthlyEarnings = dailyEarnings * 30;

  const slipsPct = ((slipsPerDay - 1) / 9) * 100;
  const winPct = ((winRate - 30) / 60) * 100;

  return (
    <Section>
      <SectionHeader
        eyebrow="Earnings Calculator"
        headline="See what your <em>slips are worth</em>"
        subtext="Adjust your posting volume and expected win rate. These numbers update in real time."
      />
      <CalcWrapper>
        <ControlPanel padding="32px">
          <SliderGroup>
            <SliderLabel>
              <LabelText>Slips posted per day</LabelText>
              <LabelValue>{slipsPerDay}</LabelValue>
            </SliderLabel>
            <Slider
              type="range"
              min={1}
              max={10}
              value={slipsPerDay}
              $pct={slipsPct}
              onChange={(e) => setSlipsPerDay(Number(e.target.value))}
              aria-label="Slips per day"
            />
            <SliderTicks>
              <Tick>1</Tick>
              <Tick>5</Tick>
              <Tick>10</Tick>
            </SliderTicks>
          </SliderGroup>

          <SliderGroup>
            <SliderLabel>
              <LabelText>Expected win rate</LabelText>
              <LabelValue>{winRate}%</LabelValue>
            </SliderLabel>
            <Slider
              type="range"
              min={30}
              max={90}
              value={winRate}
              $pct={winPct}
              onChange={(e) => setWinRate(Number(e.target.value))}
              aria-label="Win rate percentage"
            />
            <SliderTicks>
              <Tick>30%</Tick>
              <Tick>60%</Tick>
              <Tick>90%</Tick>
            </SliderTicks>
          </SliderGroup>

          <DisclaimerText>
            Based on ₦1,000 per winning slip. Platform fee (₦100) already excluded. Actual results depend on your slip quality.
          </DisclaimerText>
        </ControlPanel>

        <ResultPanel padding="32px">
          <ResultTitle>Projected Earnings</ResultTitle>

          <EarningRow>
            <EarningLabel>Per day</EarningLabel>
            <EarningValue>
              <AnimatedNumber value={dailyEarnings} />
            </EarningValue>
          </EarningRow>

          <EarningRow>
            <EarningLabel>Per week</EarningLabel>
            <EarningValue>
              <AnimatedNumber value={weeklyEarnings} />
            </EarningValue>
          </EarningRow>

          <EarningRow>
            <EarningLabel>Per month</EarningLabel>
            <EarningValue $big>
              <AnimatedNumber value={monthlyEarnings} />
            </EarningValue>
          </EarningRow>
        </ResultPanel>
      </CalcWrapper>
    </Section>
  );
}
