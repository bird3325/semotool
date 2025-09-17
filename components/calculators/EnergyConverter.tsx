
import React from 'react';
import { Bolt } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const ENERGY_UNITS = {
  'j': '줄 (J)',
  'kj': '킬로줄 (kJ)',
  'cal': '칼로리 (cal)',
  'kcal': '킬로칼로리 (kcal)',
  'wh': '와트시 (Wh)',
};

const ENERGY_CONVERSIONS_TO_JOULE: { [key: string]: number } = {
  'j': 1,
  'kj': 1000,
  'cal': 4.184,
  'kcal': 4184,
  'wh': 3600,
};

const CATEGORY_INFO = {
  icon: Bolt,
  title: '에너지 변환기',
  description: '줄, 칼로리, 와트시를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const EnergyConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={ENERGY_UNITS}
      baseUnitConversions={ENERGY_CONVERSIONS_TO_JOULE}
    />
  );
};

export default EnergyConverter;