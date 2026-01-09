
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bolt } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const ENERGY_CONVERSIONS_TO_JOULE: { [key: string]: number } = {
  'j': 1,
  'kj': 1000,
  'cal': 4.184,
  'kcal': 4184,
  'wh': 3600,
};

const EnergyConverter: React.FC = () => {
  const { t } = useTranslation();

  const ENERGY_UNITS = {
    'j': t('unit.j'), 'kj': t('unit.kj'), 'cal': t('unit.cal'),
    'kcal': t('unit.kcal'), 'wh': t('unit.wh')
  };

  const CATEGORY_INFO = {
    icon: Bolt,
    title: `${t('tool.energy')} ${t('suffix.converter')}`,
    description: t('desc.energy'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={ENERGY_UNITS}
      baseUnitConversions={ENERGY_CONVERSIONS_TO_JOULE}
    />
  );
};

export default EnergyConverter;