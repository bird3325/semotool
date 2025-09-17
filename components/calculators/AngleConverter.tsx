
import React from 'react';
import { Compass } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const ANGLE_UNITS = {
  'deg': '도 (°)',
  'rad': '라디안 (rad)',
  'grad': '그라디안 (grad)',
  'mrad': '밀리라디안 (mrad)',
};

const ANGLE_CONVERSIONS_TO_RADIAN: { [key: string]: number } = {
  'deg': Math.PI / 180,
  'rad': 1,
  'grad': Math.PI / 200,
  'mrad': 0.001,
};

const CATEGORY_INFO = {
  icon: Compass,
  title: '각도 변환기',
  description: '도, 라디안, 그라디안을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const AngleConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={ANGLE_UNITS}
      baseUnitConversions={ANGLE_CONVERSIONS_TO_RADIAN}
    />
  );
};

export default AngleConverter;