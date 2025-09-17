
import React from 'react';
import { Gauge } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const SPEED_UNITS = {
  'm/s': '미터/초 (m/s)',
  'km/h': '킬로미터/시 (km/h)',
  'mph': '마일/시 (mph)',
  'ft/s': '피트/초 (ft/s)',
  'knot': '노트 (knot)',
};

const SPEED_CONVERSIONS_TO_MPS: { [key: string]: number } = {
  'm/s': 1,
  'km/h': 0.277778,
  'mph': 0.44704,
  'ft/s': 0.3048,
  'knot': 0.514444,
};

const CATEGORY_INFO = {
  icon: Gauge,
  title: '속도 변환기',
  description: 'm/s, km/h, mph를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const SpeedConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={SPEED_UNITS}
      baseUnitConversions={SPEED_CONVERSIONS_TO_MPS}
    />
  );
};

export default SpeedConverter;