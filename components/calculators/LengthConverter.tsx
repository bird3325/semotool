import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ruler } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const LENGTH_CONVERSIONS_TO_METER: { [key: string]: number } = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34
};

const LengthConverter: React.FC = () => {
  const { t } = useTranslation();

  const LENGTH_UNITS = {
    mm: t('unit.mm'), cm: t('unit.cm'), m: t('unit.m'), km: t('unit.km'),
    inch: t('unit.inch'), ft: t('unit.ft'), yard: t('unit.yard'), mile: t('unit.mile')
  };

  const CATEGORY_INFO = {
    icon: Ruler,
    title: `${t('tool.length')} ${t('suffix.converter')}`,
    description: t('desc.length'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={LENGTH_UNITS}
      baseUnitConversions={LENGTH_CONVERSIONS_TO_METER}
    />
  );
};

export default LengthConverter;
