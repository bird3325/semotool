
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Waves } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const FREQUENCY_CONVERSIONS_TO_HERTZ: { [key: string]: number } = {
  'hz': 1,
  'khz': 1000,
  'mhz': 1000000,
  'ghz': 1000000000,
  'rpm': 1 / 60,
};

const FrequencyConverter: React.FC = () => {
  const { t } = useTranslation();

  const FREQUENCY_UNITS = {
    'hz': t('unit.hz'), 'khz': t('unit.khz'), 'mhz': t('unit.mhz'),
    'ghz': t('unit.ghz'), 'rpm': t('unit.rpm')
  };

  const CATEGORY_INFO = {
    icon: Waves,
    title: `${t('tool.frequency')} ${t('suffix.converter')}`,
    description: t('desc.frequency'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={FREQUENCY_UNITS}
      baseUnitConversions={FREQUENCY_CONVERSIONS_TO_HERTZ}
    />
  );
};

export default FrequencyConverter;