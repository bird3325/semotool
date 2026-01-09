
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Beaker } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';



const VOLUME_CONVERSIONS_TO_ML: { [key: string]: number } = {
  ml: 1,
  l: 1000,
  gal: 3785.41,
  cup: 240,
  floz: 29.5735,
  doe: 1800
};

const VolumeConverter: React.FC = () => {
  const { t } = useTranslation();

  const VOLUME_UNITS = {
    ml: t('unit.ml'), l: t('unit.l'), gal: t('unit.gal'),
    cup: t('unit.cup'), floz: t('unit.floz'), doe: t('unit.doe')
  };

  const CATEGORY_INFO = {
    icon: Beaker,
    title: `${t('tool.volume')} ${t('suffix.converter')}`,
    description: t('desc.volume'),
    gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  };

  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={VOLUME_UNITS}
      baseUnitConversions={VOLUME_CONVERSIONS_TO_ML}
    />
  );
};

export default VolumeConverter;