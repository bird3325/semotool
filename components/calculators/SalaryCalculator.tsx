
import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

interface Deductions {
  nationalPension: number;
  healthInsurance: number;
  longTermCareInsurance: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeductions: number;
}

const SalaryCalculator: React.FC = () => {
  const [annualSalary, setAnnualSalary] = useState('50000000');
  const [nonTaxable, setNonTaxable] = useState('200000');
  const [dependents, setDependents] = useState('1');
  const [result, setResult] = useState<{ monthlyGross: number; deductions: Deductions; netSalary: number } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const annual = parseFloat(annualSalary.replace(/,/g, ''));
    const nonTax = parseFloat(nonTaxable.replace(/,/g, ''));
    const numDependents = parseInt(dependents, 10);

    if (isNaN(annual) || isNaN(nonTax) || isNaN(numDependents)) {
      setResult(null);
      return;
    }
    
    // Simplified 2024 rates
    const monthlyGrossBeforeNonTaxable = annual / 12;
    const monthlyGross = monthlyGrossBeforeNonTaxable - nonTax;

    const nationalPension = monthlyGross * 0.045;
    const healthInsurance = monthlyGross * 0.03545;
    const longTermCareInsurance = healthInsurance * 0.1295;
    const employmentInsurance = monthlyGrossBeforeNonTaxable * 0.009;

    // Simplified income tax calculation (based on National Tax Service table)
    // This is a rough estimation.
    let incomeTax = 0;
    if (monthlyGross > 1000000) {
        if(numDependents === 1) incomeTax = (monthlyGross * 0.1) - 100000;
        else if (numDependents === 2) incomeTax = (monthlyGross * 0.08) - 120000;
        else incomeTax = (monthlyGross * 0.06) - 150000;
    }
    incomeTax = Math.max(0, incomeTax);

    const localIncomeTax = incomeTax * 0.1;

    const totalDeductions = nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance + incomeTax + localIncomeTax;
    const netSalary = monthlyGrossBeforeNonTaxable - totalDeductions;
    
    setResult({
      monthlyGross: monthlyGrossBeforeNonTaxable,
      deductions: { nationalPension, healthInsurance, longTermCareInsurance, employmentInsurance, incomeTax, localIncomeTax, totalDeductions },
      netSalary
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <Briefcase size={28} />
          <h2 className="text-2xl font-bold">연봉 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">내 실수령액은 얼마일까요?</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">연봉 (원)</label>
          <input type="text" value={annualSalary} onChange={e => setAnnualSalary(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={annualSalary} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">월 비과세액 (원)</label>
          <input type="text" value={nonTaxable} onChange={e => setNonTaxable(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={nonTaxable} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">부양가족 수 (본인 포함)</label>
          <input type="number" value={dependents} onChange={e => setDependents(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        
        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          계산하기
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-2">
            <h3 className="text-lg font-bold text-center mb-4">예상 실수령액</h3>
            <div className="flex justify-between items-center text-gray-800">
                <span>월 예상 소득 (세전)</span>
                <span className="font-semibold">{Math.round(result.monthlyGross).toLocaleString()} 원</span>
            </div>
            <hr className="my-2"/>
            <h4 className="font-semibold pt-2">공제액 내역</h4>
            {Object.entries({
                '국민연금': result.deductions.nationalPension,
                '건강보험': result.deductions.healthInsurance,
                '장기요양': result.deductions.longTermCareInsurance,
                '고용보험': result.deductions.employmentInsurance,
                '소득세': result.deductions.incomeTax,
                '지방소득세': result.deductions.localIncomeTax
            }).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm text-gray-600">
                    <span>{key}</span>
                    <span>- {Math.round(value).toLocaleString()} 원</span>
                </div>
            ))}
            <hr className="my-2"/>
            <div className="flex justify-between items-center font-semibold text-red-600">
                <span>총 공제액</span>
                <span>- {Math.round(result.deductions.totalDeductions).toLocaleString()} 원</span>
            </div>
             <div className="flex justify-between items-center mt-4 text-blue-600">
                <span className="text-lg font-bold">월 예상 실수령액</span>
                <span className="font-bold text-2xl">{Math.round(result.netSalary).toLocaleString()} 원</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
