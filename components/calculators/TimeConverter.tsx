
import React from 'react';
import { Clock } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const TIME_UNITS = {
  s: '초 (s)',
  min: '분 (min)',
  h: '시간 (h)',
  d: '일 (d)'
};

const TIME_CONVERSIONS_TO_SECONDS: { [key: string]: number } = {
  s: 1,
  min: 60,
  h: 3600,
  d: 86400
};

const CATEGORY_INFO = {
  icon: Clock,
  title: '시간 변환기',
  description: '초, 분, 시간을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const TimeConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={TIME_UNITS}
      baseUnitConversions={TIME_CONVERSIONS_TO_SECONDS}
    />
  );
};

export default TimeConverter;