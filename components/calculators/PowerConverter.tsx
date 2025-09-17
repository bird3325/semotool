
import React from 'react';
import { Power } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const POWER_UNITS = {
  'w': '와트 (W)',
  'kw': '킬로와트 (kW)',
  'hp': '마력 (hp)',
};

const POWER_CONVERSIONS_TO_WATT: { [key: string]: number } = {
  'w': 1,
  'kw': 1000,
  'hp': 745.7,
};

const CATEGORY_INFO = {
  icon: Power,
  title: '전력 변환기',
  description: '와트, 킬로와트, 마력을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const PowerConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={POWER_UNITS}
      baseUnitConversions={POWER_CONVERSIONS_TO_WATT}
    />
  );
};

export default PowerConverter;