
import React from 'react';
import { Gauge } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const PRESSURE_UNITS = {
  'pa': '파스칼 (Pa)',
  'kpa': '킬로파스칼 (kPa)',
  'bar': '바 (bar)',
  'atm': '기압 (atm)',
  'psi': '제곱인치당 파운드 (psi)',
};

const PRESSURE_CONVERSIONS_TO_PASCAL: { [key: string]: number } = {
  'pa': 1,
  'kpa': 1000,
  'bar': 100000,
  'atm': 101325,
  'psi': 6894.76,
};

const CATEGORY_INFO = {
  icon: Gauge,
  title: '압력 변환기',
  description: '파스칼, 바, psi를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const PressureConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={PRESSURE_UNITS}
      baseUnitConversions={PRESSURE_CONVERSIONS_TO_PASCAL}
    />
  );
};

export default PressureConverter;