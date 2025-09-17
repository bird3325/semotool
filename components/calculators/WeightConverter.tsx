import React from 'react';
import { Weight } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const WEIGHT_UNITS = {
  g: '그램 (g)', kg: '킬로그램 (kg)', t: '톤 (t)',
  oz: '온스 (oz)', lb: '파운드 (lb)'
};

const WEIGHT_CONVERSIONS_TO_GRAM: { [key: string]: number } = {
  g: 1, kg: 1000, t: 1000000,
  oz: 28.3495, lb: 453.592
};

const CATEGORY_INFO = {
  icon: Weight,
  title: '무게 변환기',
  description: '그램, 킬로그램, 파운드를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-sky-400 to-sky-600',
  buttonColor: 'bg-sky-500 hover:bg-sky-600',
};


const WeightConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={WEIGHT_UNITS}
      baseUnitConversions={WEIGHT_CONVERSIONS_TO_GRAM}
    />
  );
};

export default WeightConverter;
