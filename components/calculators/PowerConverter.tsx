
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Power } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const POWER_CONVERSIONS_TO_WATT: { [key: string]: number } = {
  'w': 1,
  'kw': 1000,
  'hp': 745.7,
};

const PowerConverter: React.FC = () => {
  const { t } = useTranslation();

  const POWER_UNITS = {
    'w': t('unit.w'), 'kw': t('unit.kw'), 'hp': t('unit.hp')
  };

  const CATEGORY_INFO = {
    icon: Power,
    title: `${t('tool.power')} ${t('suffix.converter')}`,
    description: t('desc.power'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={POWER_UNITS}
      baseUnitConversions={POWER_CONVERSIONS_TO_WATT}
    />
  );
};

export default PowerConverter;