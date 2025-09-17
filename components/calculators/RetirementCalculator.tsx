import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const getDaysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

const RetirementCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [last3MonthsSalary, setLast3MonthsSalary] = useState('10000000');
  const [annualBonus, setAnnualBonus] = useState('5000000');
  const [result, setResult] = useState<{ employmentDays: number; dailyWage: number; severancePay: number } | null>(null);
  
  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const salary = parseFloat(last3MonthsSalary.replace(/,/g, ''));
    const bonus = parseFloat(annualBonus.replace(/,/g, ''));

    if (!startDate || !endDate || isNaN(salary)) {
      setResult(null);
      return;
    }

    const employmentDays = getDaysBetween(startDate, endDate);
    if (employmentDays < 365) {
      // Typically, severance is not required for less than a year of employment
      setResult({ employmentDays, dailyWage: 0, severancePay: 0 });
      return;
    }
    
    // Simplified calculation for days in last 3 months
    const daysInLast3Months = 90;
    
    // Include pro-rated annual bonus
    const proratedBonus = (bonus || 0) * (3/12);
    const totalWagesFor3Months = salary + proratedBonus;

    const dailyWage = totalWagesFor3Months / daysInLast3Months;
    const severancePay = dailyWage * 30 * (employmentDays / 365);
    
    setResult({ employmentDays, dailyWage, severancePay });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <PiggyBank size={28} />
          <h2 className="text-2xl font-bold">퇴직금 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">예상 퇴직금을 계산해보세요.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">입사일</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">퇴사일</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">3개월간 총 급여 (세전)</label>
          <input type="text" value={last3MonthsSalary} onChange={e => setLast3MonthsSalary(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">연간 상여금 등 (세전)</label>
          <input type="text" value={annualBonus} onChange={e => setAnnualBonus(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        
        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
           <h3 className="text-lg font-bold text-center mb-4">계산 결과</h3>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">총 재직일수</span>
                <span className="font-semibold">{result.employmentDays.toLocaleString()} 일</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">1일 평균임금</span>
                <span className="font-semibold">{Math.round(result.dailyWage).toLocaleString()} 원</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center text-blue-600">
                <span className="text-lg font-bold">예상 퇴직금 (세전)</span>
                <span className="font-bold text-2xl">{Math.round(result.severancePay).toLocaleString()} 원</span>
            </div>
            <p className="text-xs text-gray-500 text-center pt-2">※ 실제 퇴직금과 차이가 있을 수 있으므로 참고용으로만 활용하세요.</p>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;
