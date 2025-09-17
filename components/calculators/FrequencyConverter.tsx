
import React from 'react';
import { Waves } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const FREQUENCY_UNITS = {
  'hz': '헤르츠 (Hz)',
  'khz': '킬로헤르츠 (kHz)',
  'mhz': '메가헤르츠 (MHz)',
  'ghz': '기가헤르츠 (GHz)',
  'rpm': '분당 회전수 (rpm)',
};

const FREQUENCY_CONVERSIONS_TO_HERTZ: { [key: string]: number } = {
  'hz': 1,
  'khz': 1000,
  'mhz': 1000000,
  'ghz': 1000000000,
  'rpm': 1 / 60,
};

const CATEGORY_INFO = {
  icon: Waves,
  title: '주파수 변환기',
  description: '헤르츠, 킬로헤르츠, rpm을 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const FrequencyConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={FREQUENCY_UNITS}
      baseUnitConversions={FREQUENCY_CONVERSIONS_TO_HERTZ}
    />
  );
};

export default FrequencyConverter;