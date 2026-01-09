
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gauge } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const PRESSURE_CONVERSIONS_TO_PASCAL: { [key: string]: number } = {
  'pa': 1,
  'kpa': 1000,
  'bar': 100000,
  'atm': 101325,
  'psi': 6894.76,
};

const PressureConverter: React.FC = () => {
  const { t } = useTranslation();

  const PRESSURE_UNITS = {
    'pa': t('unit.pa'), 'kpa': t('unit.kpa'), 'bar': t('unit.bar'),
    'atm': t('unit.atm'), 'psi': t('unit.psi')
  };

  const CATEGORY_INFO = {
    icon: Gauge,
    title: `${t('tool.pressure')} ${t('suffix.converter')}`,
    description: t('desc.pressure'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={PRESSURE_UNITS}
      baseUnitConversions={PRESSURE_CONVERSIONS_TO_PASCAL}
    />
  );
};

export default PressureConverter;