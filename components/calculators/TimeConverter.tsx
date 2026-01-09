
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const TIME_CONVERSIONS_TO_SECONDS: { [key: string]: number } = {
  s: 1,
  min: 60,
  h: 3600,
  d: 86400
};

const TimeConverter: React.FC = () => {
  const { t } = useTranslation();

  const TIME_UNITS = {
    s: t('unit.s'), min: t('unit.min'), h: t('unit.h'), d: t('unit.d')
  };

  const CATEGORY_INFO = {
    icon: Clock,
    title: `${t('tool.time')} ${t('suffix.converter')}`,
    description: t('desc.time'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={TIME_UNITS}
      baseUnitConversions={TIME_CONVERSIONS_TO_SECONDS}
    />
  );
};

export default TimeConverter;