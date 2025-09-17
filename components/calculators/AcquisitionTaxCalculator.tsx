import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const AcquisitionTaxCalculator: React.FC = () => {
  const [price, setPrice] = useState('');
  const [isPrimaryHome, setIsPrimaryHome] = useState(true);
  const [result, setResult] = useState<{ tax: number; total: number } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const p = parseFloat(price.replace(/,/g, ''));
    if (isNaN(p) || p <= 0) {
      setResult(null);
      return;
    }

    let rate = 0;
    if (isPrimaryHome) {
      if (p <= 600000000) rate = 0.01;
      else if (p <= 900000000) rate = 0.01 + (p / 100000000 * 2 / 300 - 2); // Simplified progressive rate
      else rate = 0.03;
    } else {
      rate = 0.08; // Simplified rate for multi-home owners
    }
    
    rate = Math.max(0.01, Math.min(0.03, rate)); // Clamp rate for primary homes
    
    const tax = p * rate;
    const localEducationTax = tax * 0.1;
    const specialTaxForRuralDev = p > 0 ? 200000 : 0; // Simplified
    
    const total = tax + localEducationTax + specialTaxForRuralDev;
    
    setResult({ tax, total });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <FileText size={28} />
          <h2 className="text-2xl font-bold">취득세 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">주택/토지별 세율 적용</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">취득가액 (원)</label>
          <input type="text" value={price} onChange={e => setPrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={() => setIsPrimaryHome(true)} className={`px-6 py-2 rounded-full font-semibold ${isPrimaryHome ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'}`}>1주택</button>
          <button onClick={() => setIsPrimaryHome(false)} className={`px-6 py-2 rounded-full font-semibold ${!isPrimaryHome ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'}`}>다주택</button>
        </div>
        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">예상 취득세 (부가세 포함)</p>
          <p className="text-4xl font-bold text-blue-600 my-2">
            {Math.round(result.total).toLocaleString()} 원
          </p>
          <p className="text-xs text-gray-500 text-center pt-2">※ 간이 계산 결과로 실제와 차이가 있을 수 있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AcquisitionTaxCalculator;
