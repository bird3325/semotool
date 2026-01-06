
import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const UNITS: { [key in TempUnit]: string } = {
  celsius: '섭씨 (°C)',
  fahrenheit: '화씨 (°F)',
  kelvin: '켈빈 (K)',
};

const unitOptions = Object.entries(UNITS).map(([key, name]) => ({
    value: key,
    label: name
}));

const formatNumber = (num: number): string => {
  return parseFloat(num.toFixed(2)).toLocaleString();
};

const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState('0');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('유효한 숫자를 입력하세요.');
      return;
    }

    if (fromUnit === toUnit) {
      setResult(formatNumber(numValue));
      return;
    }
    
    let celsiusValue = 0;
    // First, convert input to Celsius as a base unit
    switch (fromUnit) {
      case 'celsius':
        celsiusValue = numValue;
        break;
      case 'fahrenheit':
        celsiusValue = (numValue - 32) * 5/9;
        break;
      case 'kelvin':
        celsiusValue = numValue - 273.15;
        break;
    }

    // Then, convert from Celsius to the target unit
    let convertedValue = 0;
    switch (toUnit) {
      case 'celsius':
        convertedValue = celsiusValue;
        break;
      case 'fahrenheit':
        convertedValue = (celsiusValue * 9/5) + 32;
        break;
      case 'kelvin':
        convertedValue = celsiusValue + 273.15;
        break;
    }
    
    setResult(formatNumber(convertedValue));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-red-400 to-red-600">
        <div className="flex items-center space-x-3">
          <Thermometer size={28} />
          <h2 className="text-2xl font-bold">온도 변환기</h2>
        </div>
        <p className="mt-1 opacity-90">섭씨, 화씨, 켈빈을 쉽게 변환!</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectModal 
                label="변환 전"
                options={unitOptions}
                value={fromUnit}
                onChange={setFromUnit}
                colorClass="text-red-600"
            />
            <SelectModal 
                label="변환 후"
                options={unitOptions}
                value={toUnit}
                onChange={setToUnit}
                colorClass="text-red-600"
            />
        </div>

        <button onClick={handleConvert} className="w-full p-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          변환하기
        </button>
      </div>
      
      <AdBanner />

      {result !== null && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">변환 결과</p>
          <p className="text-3xl font-bold text-blue-600 my-2">
            {result} <span className="text-xl text-gray-700">{UNITS[toUnit].split(' ')[1] || toUnit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TemperatureConverter;
