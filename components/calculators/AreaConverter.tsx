import React from 'react';
import { Square } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const AREA_UNITS = {
  m2: '제곱미터 (m²)',
  km2: '제곱킬로미터 (km²)',
  pyeong: '평 (py)',
  acre: '에이커 (ac)'
};

const AREA_CONVERSIONS_TO_SQ_METER: { [key: string]: number } = {
  m2: 1,
  km2: 1000000,
  pyeong: 3.30579,
  acre: 4046.86
};

const CATEGORY_INFO = {
  icon: Square,
  title: '면적 변환기',
  description: '제곱미터, 평, 에이커를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-violet-400 to-violet-600',
  buttonColor: 'bg-violet-500 hover:bg-violet-600',
};

const AreaConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={AREA_UNITS}
      baseUnitConversions={AREA_CONVERSIONS_TO_SQ_METER}
    />
  );
};

export default AreaConverter;
