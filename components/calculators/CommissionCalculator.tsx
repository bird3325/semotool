
import React, { useState, useEffect, useCallback } from 'react';
import { Handshake, Info } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

type PropertyType = 'house' | 'officetel' | 'other';
type TransactionType = 'sell' | 'jeonse' | 'monthly';

// TabButton 컴포넌트를 외부로 분리하여 리랜더링 시 컴포넌트 인스턴스 유지
const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-3.5 px-2 text-sm font-black border transition-all duration-300 ${
      active 
      ? 'bg-emerald-600 text-white border-emerald-600 z-10 shadow-lg scale-[1.02]' 
      : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-gray-600 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

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
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-8 rounded-3xl text-white shadow-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <Handshake size={32} className="text-white drop-shadow-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter">부동산 중개보수 계산기</h2>
            <p className="opacity-80 text-sm font-bold mt-0.5">최신 법정 상한요율 실시간 반영</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
        {/* 매물종류 */}
        <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
                <label className="text-sm font-black text-gray-600 uppercase tracking-widest">매물종류</label>
                {propertyType === 'house' && (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">주택의 부속토지, 분양권 포함</span>
                )}
            </div>
            <div className="flex -space-x-px rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                <TabButton active={propertyType === 'house'} onClick={() => setPropertyType('house')} label="주택" />
                <TabButton active={propertyType === 'officetel'} onClick={() => setPropertyType('officetel')} label="오피스텔" />
                <TabButton active={propertyType === 'other'} onClick={() => setPropertyType('other')} label="주택 외 부동산" />
            </div>
        </div>

        {/* 거래지역 */}
        <div className="flex items-center justify-between py-4 px-5 bg-gray-50 rounded-2xl border border-gray-100">
            <label className="text-sm font-black text-gray-500 uppercase tracking-widest">거래지역</label>
            <span className="text-base font-black text-gray-900 flex items-center">
              서울시 <span className="ml-2 text-[10px] text-gray-400 font-bold">(전국 공통 요율 체계)</span>
            </span>
        </div>

        {/* 거래종류 */}
        <div className="space-y-3">
            <label className="block text-sm font-black text-gray-600 uppercase tracking-widest px-1">거래종류</label>
            <div className="flex -space-x-px rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                <TabButton active={transactionType === 'sell'} onClick={() => setTransactionType('sell')} label="매매/교환" />
                <TabButton active={transactionType === 'jeonse'} onClick={() => setTransactionType('jeonse')} label="전세 임대차" />
                <TabButton active={transactionType === 'monthly'} onClick={() => setTransactionType('monthly')} label="월세 임대차" />
            </div>
        </div>

        {/* 거래금액 */}
        <div className="space-y-3">
          <label className="block text-sm font-black text-gray-600 uppercase tracking-widest px-1">
            {transactionType === 'monthly' ? '보증금' : '거래금액'}
          </label>
          <div className="relative group">
            <input 
                type="text" 
                inputMode="numeric"
                value={price === '0' ? '' : price} 
                onChange={e => setPrice(formatNumber(e.target.value))} 
                className="w-full py-5 bg-gray-50/50 border-2 border-gray-100 focus:border-emerald-500 focus:bg-white rounded-2xl outline-none text-right font-black text-3xl text-gray-900 transition-all placeholder-gray-300 pr-12 pl-6"
                placeholder="0"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">원</span>
          </div>
        </div>

        {/* 월세 */}
        {transactionType === 'monthly' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-3">
                <label className="block text-sm font-black text-gray-600 uppercase tracking-widest px-1">월세</label>
                <div className="relative group">
                    <input 
                        type="text" 
                        inputMode="numeric"
                        value={monthlyRent === '0' ? '' : monthlyRent} 
                        onChange={e => setMonthlyRent(formatNumber(e.target.value))} 
                        className="w-full py-5 bg-gray-50/50 border-2 border-gray-100 focus:border-emerald-500 focus:bg-white rounded-2xl outline-none text-right font-black text-3xl text-gray-900 transition-all placeholder-gray-300 pr-12 pl-6"
                        placeholder="0"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">원</span>
                </div>
            </div>
        )}

        {/* 협의보수율 */}
        <div className="space-y-4">
          <label className="block text-sm font-black text-gray-600 uppercase tracking-widest px-1">협의보수율</label>
          <div className="relative group">
            <input 
                type="number" 
                step="0.01"
                value={negotiatedRate} 
                onChange={e => setNegotiatedRate(e.target.value)} 
                className="w-full py-5 bg-gray-50/50 border-2 border-gray-100 focus:border-emerald-500 focus:bg-white rounded-2xl outline-none text-right font-black text-3xl text-gray-900 transition-all placeholder-gray-300 pr-12 pl-6"
                placeholder="입력 시 우선적용"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">%</span>
          </div>
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <p className="text-[11px] text-emerald-800 font-bold leading-relaxed flex items-center">
              <Info size={14} className="mr-2 flex-shrink-0" />
              비워두거나 상한요율보다 높은 값을 입력하면 법정 상한요율이 자동으로 적용됩니다.
            </p>
          </div>
        </div>
      </div>

      <AdBanner />

      {result && (
        <div className="p-10 bg-white border-2 border-emerald-100 rounded-[40px] shadow-2xl space-y-8 animate-in zoom-in-95 duration-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          
          <div className="text-center space-y-2">
            <p className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.3em]">Estimated Brokerage Fee</p>
            <div className="inline-block relative">
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">
                  {Math.round(result.commission).toLocaleString()} <span className="text-2xl text-gray-400 ml-1">원</span>
              </h3>
              <div className="h-2 w-full bg-emerald-100 absolute bottom-1 left-0 -z-10 rounded-full opacity-60"></div>
            </div>
            <p className="text-[13px] font-bold text-gray-400 mt-2">부가가치세 10% 별도: {Math.round(result.vat).toLocaleString()}원</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[11px] font-black text-gray-400 uppercase">거래 환산금액</span>
                <p className="font-black text-lg text-gray-800">{result.transactionAmount.toLocaleString()}원</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[11px] font-black text-gray-400 uppercase">법정 상한요율</span>
                <p className="font-black text-lg text-gray-800">{result.maxRate.toFixed(2)}%</p>
            </div>
            <div className="bg-emerald-600 p-5 rounded-2xl border border-emerald-500 shadow-lg shadow-emerald-100 space-y-1 md:col-span-2">
                <span className="text-[11px] font-black text-emerald-100 uppercase">최종 적용 요율</span>
                <div className="flex justify-between items-end">
                  <p className="font-black text-2xl text-white">{result.appliedRate.toFixed(2)}%</p>
                  {result.limit && result.commission >= result.limit && (
                    <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded text-white border border-white/20">한도액 적용됨</span>
                  )}
                </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-5 bg-gray-900 rounded-3xl">
            <div className="bg-emerald-500 p-1.5 rounded-lg flex-shrink-0">
              <Info size={16} className="text-white" />
            </div>
            <p className="text-[11px] text-gray-300 font-bold leading-relaxed">
                본 계산 결과는 서울시 조례를 기준으로 한 법정 상한선입니다. <br/>
                실제 중개보수는 공인중개사와 협의하여 결정하며, 중개업소의 과세 유형(일반/간이)에 따라 부가세율이 다를 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
