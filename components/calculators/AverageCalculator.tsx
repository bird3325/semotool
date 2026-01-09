import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Plus, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const AverageCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [result, setResult] = useState<{ average: number; sum: number; count: number } | null>(null);

  const handleAddNumber = () => {
    const num = parseFloat(currentNumber);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setCurrentNumber('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNumber();
    }
  };

  const handleRemoveNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    if (numbers.length === 0) {
      setResult(null);
      return;
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const count = numbers.length;
    const average = sum / count;
    setResult({ average, sum, count });
  };

  const handleReset = () => {
    setNumbers([]);
    setCurrentNumber('');
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Calculator size={28} />
          <h2 className="text-2xl font-bold">{t('tool.average')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('math.average.desc')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex space-x-2">
          <input
            type="number"
            value={currentNumber}
            onChange={e => setCurrentNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('math.average.placeholder_number')}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
          />
          <button onClick={handleAddNumber} className="p-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
            <Plus size={24} />
          </button>
        </div>

        {numbers.length > 0 && (
          <div className="p-3 bg-gray-50 rounded-lg flex flex-wrap gap-2">
            {numbers.map((num, index) => (
              <div key={index} className="flex items-center bg-rose-100 text-rose-800 text-sm font-semibold px-2.5 py-1 rounded-full">
                {num}
                <button onClick={() => handleRemoveNumber(index)} className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-rose-200">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <button onClick={handleCalculate} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition">
            {t('common.calculate')}
          </button>
          <button onClick={handleReset} className="w-full p-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg text-lg transition">
            {t('common.reset')}
          </button>
        </div>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-2">
          <p className="text-sm text-gray-500">{t('math.average.result_average')}</p>
          <p className="text-4xl font-bold text-blue-600">
            {result.average.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </p>
          <div className="flex justify-center space-x-6 text-gray-600 pt-2">
            <span>{t('math.average.result_sum', { sum: result.sum.toLocaleString() })}</span>
            <span>{t('math.average.result_count', { count: result.count })}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
