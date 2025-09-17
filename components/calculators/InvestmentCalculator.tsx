import React, { useState } from 'react';
import { AreaChart } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const InvestmentCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('1000000');
  const [monthlyContribution, setMonthlyContribution] = useState('100000');
  const [period, setPeriod] = useState('10');
  const [annualRate, setAnnualRate] = useState('7');
  const [isCompound, setIsCompound] = useState(true); // Default to monthly compound
  const [result, setResult] = useState<{ futureValue: number; totalPrincipal: number; totalInterest: number; } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const P = parseFloat(initialAmount.replace(/,/g, ''));
    const PMT = parseFloat(monthlyContribution.replace(/,/g, ''));
    const years = parseInt(period, 10);
    const r_annual = parseFloat(annualRate) / 100;

    if (isNaN(P) || isNaN(PMT) || isNaN(years) || isNaN(r_annual)) {
      setResult(null);
      return;
    }
    
    const n = years * 12; // total months
    const r_monthly = r_annual / 12; // monthly rate
    
    let futureValue = 0;
    
    if (isCompound) {
      // Compound interest calculation
      const futureValueOfInitial = P * Math.pow(1 + r_monthly, n);
      const futureValueOfContributions = PMT * ( (Math.pow(1 + r_monthly, n) - 1) / r_monthly );
      futureValue = futureValueOfInitial + futureValueOfContributions;
    } else {
      // Simple interest calculation
      const totalInterestOnInitial = P * r_annual * years;
      // Simple interest on contributions is more complex, let's estimate
      const totalContribution = PMT * n;
      const avgInterest = totalContribution * r_annual * (years / 2); // Approximation
      futureValue = P + totalInterestOnInitial + totalContribution + avgInterest;
    }

    const totalPrincipal = P + (PMT * n);
    const totalInterest = futureValue - totalPrincipal;

    setResult({ futureValue, totalPrincipal, totalInterest });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <AreaChart size={28} />
          <h2 className="text-2xl font-bold">투자 수익 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">복리의 힘을 확인해보세요.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">초기 투자금 (원)</label>
          <input type="text" value={initialAmount} onChange={e => setInitialAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">매월 적립액 (원)</label>
          <input type="text" value={monthlyContribution} onChange={e => setMonthlyContribution(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">투자기간 (년)</label>
          <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">연간 예상 수익률 (%)</label>
          <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
         <div className="flex justify-center space-x-4">
          <button onClick={() => setIsCompound(false)} className={`px-6 py-2 rounded-full font-semibold ${!isCompound ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}>단리</button>
          <button onClick={() => setIsCompound(true)} className={`px-6 py-2 rounded-full font-semibold ${isCompound ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}>복리 (월)</button>
        </div>
        
        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
           <h3 className="text-lg font-bold text-center mb-4">투자기간 {period}년 후 예상 금액</h3>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">총 원금</span>
                <span className="font-semibold">{Math.round(result.totalPrincipal).toLocaleString()} 원</span>
            </div>
            <div className="flex justify-between items-center text-green-600">
                <span className="text-gray-600">총 수익 (세전)</span>
                <span className="font-semibold">+ {Math.round(result.totalInterest).toLocaleString()} 원</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center text-blue-600">
                <span className="text-lg font-bold">최종 예상 금액</span>
                <span className="font-bold text-2xl">{Math.round(result.futureValue).toLocaleString()} 원</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
