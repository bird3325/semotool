
import React from 'react';
import { Beaker } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const VOLUME_UNITS = {
  ml: '밀리리터 (ml)',
  l: '리터 (l)',
  gal: '갤런 (gal)',
  cup: '컵 (cup)',
  floz: '액량 온스 (fl oz)',
  doe: '되'
};

const VOLUME_CONVERSIONS_TO_ML: { [key: string]: number } = {
  ml: 1,
  l: 1000,
  gal: 3785.41,
  cup: 240,
  floz: 29.5735,
  doe: 1800
};

const CATEGORY_INFO = {
  icon: Beaker,
  title: '부피 변환기',
  description: '리터, 갤런, 컵을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const VolumeConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={VOLUME_UNITS}
      baseUnitConversions={VOLUME_CONVERSIONS_TO_ML}
    />
  );
};

export default VolumeConverter;