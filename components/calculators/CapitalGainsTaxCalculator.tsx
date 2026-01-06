
import React, { useState } from 'react';
import { ClipboardCopy } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const CapitalGainsTaxCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('2');
  const [result, setResult] = useState<{ capitalGain: number; tax: number } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const purchase = parseFloat(purchasePrice.replace(/,/g, ''));
    const sale = parseFloat(salePrice.replace(/,/g, ''));
    const period = parseInt(holdingPeriod, 10);
    
    if (isNaN(purchase) || isNaN(sale) || isNaN(period) || sale <= purchase) {
      setResult(null);
      return;
    }

    const capitalGain = sale - purchase;
    
    // Highly simplified tax rates based on holding period
    let rate = 0;
    if (period < 1) rate = 0.7;
    else if (period < 2) rate = 0.6;
    else rate = 0.4; // Simplified basic progressive rate

    const tax = capitalGain * rate;
    
    setResult({ capitalGain, tax });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <ClipboardCopy size={28} />
          <h2 className="text-2xl font-bold">양도소득세 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">보유기간, 거주용/비거주용 고려</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">취득가액 (원)</label>
          <input type="text" value={purchasePrice} onChange={e => setPurchasePrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={purchasePrice} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">양도가액 (원)</label>
          <input type="text" value={salePrice} onChange={e => setSalePrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={salePrice} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">보유 기간 (년)</label>
          <input type="number" value={holdingPeriod} onChange={e => setHoldingPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">예상 양도소득세</p>
          <p className="text-4xl font-bold text-blue-600 my-2">
            {Math.round(result.tax).toLocaleString()} 원
          </p>
          <p className="text-md text-gray-700">
            양도차익: {result.capitalGain.toLocaleString()}원
          </p>
          <p className="text-xs text-gray-500 text-center pt-2">※ 매우 간소화된 계산으로, 실제 세액과 큰 차이가 있을 수 있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default CapitalGainsTaxCalculator;
