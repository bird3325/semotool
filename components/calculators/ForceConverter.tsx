
import React from 'react';
import { Move } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const FORCE_UNITS = {
  'n': '뉴턴 (N)',
  'kgf': '킬로그램힘 (kgf)',
  'lbf': '파운드힘 (lbf)',
};

const FORCE_CONVERSIONS_TO_NEWTON: { [key: string]: number } = {
  'n': 1,
  'kgf': 9.80665,
  'lbf': 4.44822,
};

const CATEGORY_INFO = {
  icon: Move,
  title: '힘 변환기',
  description: '뉴턴, 킬로그램힘을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const ForceConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={FORCE_UNITS}
      baseUnitConversions={FORCE_CONVERSIONS_TO_NEWTON}
    />
  );
};

export default ForceConverter;