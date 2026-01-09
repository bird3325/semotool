
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Database } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const DATA_CONVERSIONS_TO_BYTE: { [key: string]: number } = {
  byte: 1,
  kb: 1024,
  mb: Math.pow(1024, 2),
  gb: Math.pow(1024, 3),
  tb: Math.pow(1024, 4),
};

const DataStorageConverter: React.FC = () => {
  const { t } = useTranslation();

  const DATA_UNITS = {
    byte: t('unit.byte'), kb: t('unit.kb'), mb: t('unit.mb'), gb: t('unit.gb'), tb: t('unit.tb')
  };

  const CATEGORY_INFO = {
    icon: Database,
    title: `${t('tool.data-storage')} ${t('suffix.converter')}`,
    description: t('desc.data-storage'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={DATA_UNITS}
      baseUnitConversions={DATA_CONVERSIONS_TO_BYTE}
    />
  );
};

export default DataStorageConverter;