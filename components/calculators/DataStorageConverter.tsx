
import React from 'react';
import { Database } from 'lucide-react';
import SingleUnitConverter from './SingleUnitConverter';

const DATA_UNITS = {
  byte: '바이트 (B)',
  kb: '킬로바이트 (KB)',
  mb: '메가바이트 (MB)',
  gb: '기가바이트 (GB)',
  tb: '테라바이트 (TB)',
};

const DATA_CONVERSIONS_TO_BYTE: { [key: string]: number } = {
  byte: 1,
  kb: 1024,
  mb: Math.pow(1024, 2),
  gb: Math.pow(1024, 3),
  tb: Math.pow(1024, 4),
};

const CATEGORY_INFO = {
  icon: Database,
  title: '데이터 저장용량 변환기',
  description: '바이트, KB, MB, GB를 쉽게 변환!',
  gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
};

const DataStorageConverter: React.FC = () => {
  return (
    <SingleUnitConverter
      categoryInfo={CATEGORY_INFO}
      units={DATA_UNITS}
      baseUnitConversions={DATA_CONVERSIONS_TO_BYTE}
    />
  );
};

export default DataStorageConverter;