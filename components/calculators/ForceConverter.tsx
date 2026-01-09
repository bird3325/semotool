
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Move } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const FORCE_CONVERSIONS_TO_NEWTON: { [key: string]: number } = {
  'n': 1,
  'kgf': 9.80665,
  'lbf': 4.44822,
};

const ForceConverter: React.FC = () => {
  const { t } = useTranslation();

  const FORCE_UNITS = {
    'n': t('unit.n'), 'kgf': t('unit.kgf'), 'lbf': t('unit.lbf')
  };

  const CATEGORY_INFO = {
    icon: Move,
    title: `${t('tool.force')} ${t('suffix.converter')}`,
    description: t('desc.force'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={FORCE_UNITS}
      baseUnitConversions={FORCE_CONVERSIONS_TO_NEWTON}
    />
  );
};

export default ForceConverter;