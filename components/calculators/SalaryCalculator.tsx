
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      if (numDependents === 1) incomeTax = (monthlyGross * 0.1) - 100000;
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
          <h2 className="text-2xl font-bold">{t('tool.salary')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.desc.salary')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.annual_salary')}</label>
          <input type="text" value={annualSalary} onChange={e => setAnnualSalary(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={annualSalary} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.non_taxable_monthly')}</label>
          <input type="text" value={nonTaxable} onChange={e => setNonTaxable(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={nonTaxable} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.dependents')}</label>
          <input type="number" value={dependents} onChange={e => setDependents(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>

        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-2">
          <h3 className="text-lg font-bold text-center mb-4">{t('finance.result.title_expected_net_salary')}</h3>
          <div className="flex justify-between items-center text-gray-800">
            <span>{t('finance.result.monthly_gross_pre_tax')}</span>
            <span className="font-semibold">{Math.round(result.monthlyGross).toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <hr className="my-2" />
          <h4 className="font-semibold pt-2">{t('finance.deduction.title')}</h4>
          {Object.entries({
            [t('finance.deduction.national_pension')]: result.deductions.nationalPension,
            [t('finance.deduction.health_insurance')]: result.deductions.healthInsurance,
            [t('finance.deduction.long_term_care')]: result.deductions.longTermCareInsurance,
            [t('finance.deduction.employment_insurance')]: result.deductions.employmentInsurance,
            [t('finance.deduction.income_tax')]: result.deductions.incomeTax,
            [t('finance.deduction.local_tax')]: result.deductions.localIncomeTax
          }).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-sm text-gray-600">
              <span>{key}</span>
              <span>- {Math.round(value).toLocaleString()} {t('currency.KRW')}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between items-center font-semibold text-red-600">
            <span>{t('finance.deduction.total')}</span>
            <span>- {Math.round(result.deductions.totalDeductions).toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center mt-4 text-blue-600">
            <span className="text-lg font-bold">{t('finance.result.net_salary_monthly')}</span>
            <span className="font-bold text-2xl">{Math.round(result.netSalary).toLocaleString()} {t('currency.KRW')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
