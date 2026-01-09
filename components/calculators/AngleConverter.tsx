
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const ANGLE_CONVERSIONS_TO_RADIAN: { [key: string]: number } = {
  'deg': Math.PI / 180,
  'rad': 1,
  'grad': Math.PI / 200,
  'mrad': 0.001,
};

const AngleConverter: React.FC = () => {
  const { t } = useTranslation();

  const ANGLE_UNITS = {
    'deg': t('unit.deg'), 'rad': t('unit.rad'), 'grad': t('unit.grad'),
    'mrad': t('unit.mrad')
  };

  const CATEGORY_INFO = {
    icon: Compass,
    title: `${t('tool.angle')} ${t('suffix.converter')}`,
    description: t('desc.angle'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={ANGLE_UNITS}
      baseUnitConversions={ANGLE_CONVERSIONS_TO_RADIAN}
    />
  );
};

export default AngleConverter;