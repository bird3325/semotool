
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gauge } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const SPEED_CONVERSIONS_TO_MPS: { [key: string]: number } = {
  'm/s': 1,
  'km/h': 0.277778,
  'mph': 0.44704,
  'ft/s': 0.3048,
  'knot': 0.514444,
};

const SpeedConverter: React.FC = () => {
  const { t } = useTranslation();

  const SPEED_UNITS = {
    'm/s': t('unit.m/s'), 'km/h': t('unit.km/h'), 'mph': t('unit.mph'),
    'ft/s': t('unit.ft/s'), 'knot': t('unit.knot')
  };

  const CATEGORY_INFO = {
    icon: Gauge,
    title: `${t('tool.speed')} ${t('suffix.converter')}`,
    description: t('desc.speed'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={SPEED_UNITS}
      baseUnitConversions={SPEED_CONVERSIONS_TO_MPS}
    />
  );
};

export default SpeedConverter;