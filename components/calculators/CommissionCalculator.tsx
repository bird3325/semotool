import React, { useState } from 'react';
import { Handshake } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const CommissionCalculator: React.FC = () => {
  const [transactionType, setTransactionType] = useState('sell');
  const [propertyType, setPropertyType] = useState('house');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<{ commission: number; rate: number; limit: number | null } | null>(null);
  
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
    let limit = null;

    if (propertyType === 'house') {
      if (transactionType === 'sell') { // 매매/교환
        if (p < 50000000) { rate = 0.006; limit = 250000; } 
        else if (p < 200000000) { rate = 0.005; limit = 800000; }
        else if (p < 900000000) { rate = 0.004; }
        else if (p < 1200000000) { rate = 0.005; }
        else if (p < 1500000000) { rate = 0.006; }
        else { rate = 0.007; }
      } else { // 임대차
        if (p < 50000000) { rate = 0.005; limit = 200000; }
        else if (p < 100000000) { rate = 0.004; limit = 300000; }
        else if (p < 600000000) { rate = 0.003; }
        else if (p < 1200000000) { rate = 0.004; }
        else if (p < 1500000000) { rate = 0.005; }
        else { rate = 0.006; }
      }
    } else { // 오피스텔 및 기타
      rate = transactionType === 'sell' ? 0.005 : 0.004;
    }

    let commission = p * rate;
    if (limit !== null && commission > limit) {
      commission = limit;
    }

    setResult({ commission, rate: rate * 100, limit });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <Handshake size={28} />
          <h2 className="text-2xl font-bold">부동산 중개수수료</h2>
        </div>
        <p className="mt-1 opacity-90">매매/임대별 수수료 계산</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">거래 종류</label>
          <select value={transactionType} onChange={e => setTransactionType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <option value="sell">매매/교환</option>
            <option value="lease">임대차 등</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">부동산 종류</label>
          <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <option value="house">주택</option>
            <option value="other">오피스텔/기타</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">거래금액 (원)</label>
          <input type="text" value={price} onChange={e => setPrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">최대 중개보수 (VAT 별도)</p>
          <p className="text-4xl font-bold text-blue-600 my-2">
            {Math.round(result.commission).toLocaleString()} 원
          </p>
          <p className="text-md text-gray-700">
            상한요율: {result.rate.toFixed(3)}%
            {result.limit && ` (한도액: ${result.limit.toLocaleString()}원)`}
          </p>
          <p className="text-xs text-gray-500 text-center pt-2">※ 실제 중개보수와 차이가 있을 수 있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
