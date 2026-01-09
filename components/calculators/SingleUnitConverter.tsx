
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

interface SingleUnitConverterProps {
  categoryInfo: {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    buttonColor: string;
  };
  units: { [key: string]: string };
  baseUnitConversions: { [key: string]: number };
}

const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (Math.abs(num) < 1e-6 && num !== 0) {
    return num.toExponential(6);
  }
  return parseFloat(num.toFixed(6)).toLocaleString();
};


const SingleUnitConverter: React.FC<SingleUnitConverterProps> = ({ categoryInfo, units, baseUnitConversions }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(Object.keys(units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units)[1] || Object.keys(units)[0]);
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = () => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setResult(t('common.invalid_number'));
      return;
    }

    const fromRate = baseUnitConversions[fromUnit];
    const toRate = baseUnitConversions[toUnit];

    if (fromRate === undefined || toRate === undefined) {
      setResult(t('common.cannot_convert'));
      return;
    }

    const valueInBase = numericValue * fromRate;
    const convertedValue = valueInBase / toRate;

    setResult(`${formatNumber(convertedValue)}`);
  };

  const { icon: Icon, title, description, gradient, buttonColor } = categoryInfo;

  const options = Object.entries(units).map(([key, name]) => ({
    value: key,
    label: name
  }));

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl text-white shadow-lg ${gradient}`}>
        <div className="flex items-center space-x-3">
          <Icon size={28} />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="mt-1 opacity-90">{description}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('common.input_value')}</label>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-3xl text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectModal
            label={t('common.from')}
            options={options}
            value={fromUnit}
            onChange={setFromUnit}
          />
          <SelectModal
            label={t('common.to')}
            options={options}
            value={toUnit}
            onChange={setToUnit}
          />
        </div>

        <button onClick={handleConvert} className={`w-full p-4 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105 ${buttonColor}`}>
          {t('common.convert')}
        </button>
      </div>

      <AdBanner />

      {result !== null && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">{t('common.result')}</p>
          <p className="text-3xl font-bold text-blue-600 my-2">
            {result} <span className="text-xl text-gray-700">{units[toUnit].split(' ')[1] || toUnit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleUnitConverter;
