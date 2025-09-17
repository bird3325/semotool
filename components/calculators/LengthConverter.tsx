import React from 'react';
import { Ruler } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const LENGTH_UNITS = {
  mm: '밀리미터 (mm)', cm: '센티미터 (cm)', m: '미터 (m)', km: '킬로미터 (km)',
  inch: '인치 (in)', ft: '피트 (ft)', yard: '야드 (yd)', mile: '마일 (mile)'
};

const LENGTH_CONVERSIONS_TO_METER: { [key: string]: number } = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34
};

const CATEGORY_INFO = {
  icon: Ruler,
  title: '길이 변환기',
  description: '미터, 인치, 피트를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const LengthConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={LENGTH_UNITS}
      baseUnitConversions={LENGTH_CONVERSIONS_TO_METER}
    />
  );
};

export default LengthConverter;
