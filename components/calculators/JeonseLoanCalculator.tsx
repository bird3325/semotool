
import React, { useState } from 'react';
import { Building } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const periodOptions = [
    { value: '1', label: '1년' },
    { value: '2', label: '2년 (기본)' },
    { value: '3', label: '3년' },
    { value: '4', label: '4년' },
    { value: '5', label: '5년' },
    { value: '10', label: '10년' },
];

const JeonseLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('200000000');
  const [interestRate, setInterestRate] = useState('3.8');
  const [loanPeriod, setLoanPeriod] = useState('2');
  const [result, setResult] = useState<{ monthlyPayment: number; totalInterest: number; } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const P = parseFloat(loanAmount.replace(/,/g, ''));
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseInt(loanPeriod, 10);
    
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setResult(null);
      return;
    }
    
    const monthlyInterest = (P * annualRate) / 12;
    const totalInterest = monthlyInterest * (years * 12);

    setResult({ monthlyPayment: monthlyInterest, totalInterest });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <Building size={28} />
          <h2 className="text-2xl font-bold">전세자금대출 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">매월 내야 할 이자를 계산합니다.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">대출금액 (원)</label>
          <input type="text" value={loanAmount} onChange={e => setLoanAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">대출금리 (연 %)</label>
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        
        <SelectModal 
            label="대출 기간"
            options={periodOptions}
            value={loanPeriod}
            onChange={setLoanPeriod}
            colorClass="text-violet-600"
        />
        
        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
           <h3 className="text-lg font-bold text-center mb-4">예상 이자</h3>
           <div className="flex justify-between items-center text-blue-600">
            <span className="font-semibold">월 상환 이자</span>
            <span className="font-bold text-xl">{Math.round(result.monthlyPayment).toLocaleString()} 원</span>
          </div>
          <hr className="my-2"/>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">총 이자</span>
            <span className="font-bold text-2xl">{Math.round(result.totalInterest).toLocaleString()} 원</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JeonseLoanCalculator;
