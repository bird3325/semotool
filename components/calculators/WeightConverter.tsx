import React from 'react';
import { useTranslation } from 'react-i18next';
import { Weight } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const WEIGHT_CONVERSIONS_TO_GRAM: { [key: string]: number } = {
  g: 1, kg: 1000, t: 1000000,
  oz: 28.3495, lb: 453.592
};

const WeightConverter: React.FC = () => {
  const { t } = useTranslation();

  const WEIGHT_UNITS = {
    g: t('unit.g'), kg: t('unit.kg'), t: t('unit.t'),
    oz: t('unit.oz'), lb: t('unit.lb')
  };

  const CATEGORY_INFO = {
    icon: Weight,
    title: `${t('tool.weight')} ${t('suffix.converter')}`,
    description: t('desc.weight'),
    gradient: 'bg-gradient-to-br from-sky-400 to-sky-600',
    buttonColor: 'bg-sky-500 hover:bg-sky-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={WEIGHT_UNITS}
      baseUnitConversions={WEIGHT_CONVERSIONS_TO_GRAM}
    />
  );
};

export default WeightConverter;
