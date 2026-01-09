import React from 'react';
import { useTranslation } from 'react-i18next';
import { Square } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const AREA_CONVERSIONS_TO_SQ_METER: { [key: string]: number } = {
  m2: 1,
  km2: 1000000,
  pyeong: 3.30579,
  acre: 4046.86
};

const AreaConverter: React.FC = () => {
  const { t } = useTranslation();

  const AREA_UNITS = {
    m2: t('unit.m2'), km2: t('unit.km2'), pyeong: t('unit.pyeong'), acre: t('unit.acre')
  };

  const CATEGORY_INFO = {
    icon: Square,
    title: `${t('tool.area')} ${t('suffix.converter')}`,
    description: t('desc.area'),
    gradient: 'bg-gradient-to-br from-violet-400 to-violet-600',
    buttonColor: 'bg-violet-500 hover:bg-violet-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={AREA_UNITS}
      baseUnitConversions={AREA_CONVERSIONS_TO_SQ_METER}
    />
  );
};

export default AreaConverter;
