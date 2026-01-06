
import React, { useState, useEffect, useCallback } from 'react';
import { Handshake, Info } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

type PropertyType = 'house' | 'officetel' | 'other';
type TransactionType = 'sell' | 'jeonse' | 'monthly';

const propertyOptions = [
  { value: 'house', label: '주택' },
  { value: 'officetel', label: '오피스텔' },
  { value: 'other', label: '주택 외 부동산' }
];

const transactionOptions = [
  { value: 'sell', label: '매매/교환' },
  { value: 'jeonse', label: '전세 임대차' },
  { value: 'monthly', label: '월세 임대차' }
];

const CommissionCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<PropertyType>('house');
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [price, setPrice] = useState('0');
  const [monthlyRent, setMonthlyRent] = useState('0');
  const [negotiatedRate, setNegotiatedRate] = useState('');
  const [result, setResult] = useState<{ 
    commission: number; 
    maxRate: number; 
    appliedRate: number;
    limit: number | null; 
    transactionAmount: number;
    vat: number;
  } | null>(null);
  
  const formatNumber = (val: string) => {
    const raw = val.replace(/,/g, '');
    if (!raw) return '0';
    const num = Number(raw);
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = useCallback(() => {
    const p = parseFloat(price.replace(/,/g, '')) || 0;
    const rent = parseFloat(monthlyRent.replace(/,/g, '')) || 0;
    const negRateInput = parseFloat(negotiatedRate);
    const negRate = negRateInput / 100;

    let transactionAmount = p;
    if (transactionType === 'monthly') {
        transactionAmount = p + (rent * 100);
        if (transactionAmount < 50000000) {
            transactionAmount = p + (rent * 70);
        }
    }

    if (transactionAmount <= 0) {
      setResult(null);
      return;
    }

    let maxRate = 0;
    let limit = null;

    if (propertyType === 'house') {
      if (transactionType === 'sell') {
        if (transactionAmount < 50000000) { maxRate = 0.006; limit = 250000; } 
        else if (transactionAmount < 200000000) { maxRate = 0.005; limit = 800000; }
        else if (transactionAmount < 900000000) { maxRate = 0.004; }
        else if (transactionAmount < 1200000000) { maxRate = 0.005; }
        else if (transactionAmount < 1500000000) { maxRate = 0.006; }
        else { maxRate = 0.007; }
      } else {
        if (transactionAmount < 50000000) { maxRate = 0.005; limit = 200000; }
        else if (transactionAmount < 100000000) { maxRate = 0.004; limit = 300000; }
        else if (transactionAmount < 600000000) { maxRate = 0.003; }
        else if (transactionAmount < 1200000000) { maxRate = 0.004; }
        else if (transactionAmount < 1500000000) { maxRate = 0.005; }
        else { maxRate = 0.006; }
      }
    } else if (propertyType === 'officetel') {
      maxRate = transactionType === 'sell' ? 0.005 : 0.004;
    } else {
      maxRate = 0.009;
    }

    const appliedRate = (negotiatedRate === '' || isNaN(negRate) || negRate > maxRate) ? maxRate : negRate;

    let commission = transactionAmount * appliedRate;
    if (limit !== null && commission > limit) {
      commission = limit;
    }

    setResult({ 
        commission, 
        maxRate: maxRate * 100, 
        appliedRate: appliedRate * 100,
        limit, 
        transactionAmount,
        vat: commission * 0.1
    });
  }, [price, monthlyRent, negotiatedRate, propertyType, transactionType]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <Handshake size={28} />
          <h2 className="text-2xl font-bold">중개수수료 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">법정 상한요율 기준 예상 수수료 계산</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectModal 
                label="매물 종류" 
                options={propertyOptions} 
                value={propertyType} 
                onChange={setPropertyType} 
                colorClass="text-violet-600"
            />
            <SelectModal 
                label="거래 종류" 
                options={transactionOptions} 
                value={transactionType} 
                onChange={setTransactionType} 
                colorClass="text-violet-600"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {transactionType === 'monthly' ? '보증금 (원)' : '거래금액 (원)'}
            </label>
            <input 
                type="text" 
                inputMode="numeric"
                value={price === '0' ? '' : price} 
                onChange={e => setPrice(formatNumber(e.target.value))} 
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="0"
            />
            <AmountUnit value={price} />
          </div>

          {transactionType === 'monthly' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-gray-600 mb-2">월세 (원)</label>
                <input 
                    type="text" 
                    inputMode="numeric"
                    value={monthlyRent === '0' ? '' : monthlyRent} 
                    onChange={e => setMonthlyRent(formatNumber(e.target.value))} 
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="0"
                />
                <AmountUnit value={monthlyRent} />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">협의보수율 (%)</label>
          <input 
              type="number" 
              step="0.01"
              value={negotiatedRate} 
              onChange={e => setNegotiatedRate(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="미입력 시 상한요율 적용"
          />
          <p className="text-[11px] text-gray-400 mt-2 flex items-center">
            <Info size={12} className="mr-1" />
            상한요율보다 높은 협의보수율은 법적 효력이 없습니다.
          </p>
        </div>

        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform active:scale-95 shadow-md">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-4 border border-violet-100 animate-in zoom-in-95 duration-500">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">예상 중개수수료 (VAT 별도)</p>
            <p className="text-4xl font-bold text-blue-600">
                {Math.round(result.commission).toLocaleString()} 원
            </p>
            <p className="text-xs text-gray-400">부가가치세 10% 포함 시: {Math.round(result.commission * 1.1).toLocaleString()}원</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">적용 요율</span>
                <p className="font-bold text-gray-800">{result.appliedRate.toFixed(2)}%</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">거래 가액</span>
                <p className="font-bold text-gray-800">{result.transactionAmount.toLocaleString()}원</p>
            </div>
          </div>
          
          <div className="p-3 bg-violet-50 rounded-lg border border-violet-100">
            <p className="text-[11px] text-violet-700 leading-relaxed">
                본 결과는 법정 상한선을 기준으로 계산되었습니다. 실제 수수료는 중개업소의 과세유형 및 협의에 따라 다를 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
