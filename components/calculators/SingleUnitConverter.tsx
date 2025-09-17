import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

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
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(Object.keys(units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units)[1] || Object.keys(units)[0]);
  const [result, setResult] = useState<string | null>(null);
  
  const handleConvert = () => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setResult('유효한 숫자를 입력하세요.');
      return;
    }
    
    const fromRate = baseUnitConversions[fromUnit];
    const toRate = baseUnitConversions[toUnit];
    
    if(fromRate === undefined || toRate === undefined) {
      setResult('변환을 수행할 수 없습니다.');
      return;
    }

    const valueInBase = numericValue * fromRate;
    const convertedValue = valueInBase / toRate;
    
    setResult(`${formatNumber(convertedValue)}`);
  };

  const { icon: Icon, title, description, gradient, buttonColor } = categoryInfo;

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
          <label className="block text-sm font-medium text-gray-600 mb-2">변환할 값</label>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-3xl text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-center">변환 전</label>
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-base appearance-none bg-chevron-down bg-no-repeat bg-right pr-8 text-center">
                    {Object.entries(units).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-center">변환 후</label>
                 <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-base appearance-none bg-chevron-down bg-no-repeat bg-right pr-8 text-center">
                    {Object.entries(units).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
                </select>
            </div>
        </div>

        <button onClick={handleConvert} className={`w-full p-4 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105 ${buttonColor}`}>
          변환하기
        </button>
      </div>
      
      <AdBanner />

      {result !== null && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">변환 결과</p>
          <p className="text-3xl font-bold text-blue-600 my-2">
            {result} <span className="text-xl text-gray-700">{units[toUnit].split(' ')[1] || toUnit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleUnitConverter;
